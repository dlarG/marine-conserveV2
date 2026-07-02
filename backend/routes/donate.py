from flask import Blueprint, request, jsonify, current_app
from flask_limiter import Limiter # type: ignore
from flask_limiter.util import get_remote_address # type: ignore
from datetime import datetime, timedelta
from utils.email_service import EmailService
import sqlite3
import os
import logging

logger = logging.getLogger(__name__)

donate_bp = Blueprint('donate', __name__)

# Database setup for tracking donations
DATABASE_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'donations.db')

def init_db():
    """Initialize the database and create tables if they don't exist"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # Table for tracking IP-based rate limiting
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS donation_attempts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ip_address TEXT NOT NULL,
            attempt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            amount TEXT,
            email TEXT
        )
    ''')
    
    # Table for storing donation records
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS donations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT,
            last_name TEXT,
            email TEXT,
            phone TEXT,
            donation_type TEXT,
            amount TEXT,
            message TEXT,
            newsletter INTEGER DEFAULT 0,
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            verified_at TIMESTAMP
        )
    ''')
    
    # Create index for faster queries
    cursor.execute('''
        CREATE INDEX IF NOT EXISTS idx_ip_address 
        ON donation_attempts(ip_address)
    ''')
    
    cursor.execute('''
        CREATE INDEX IF NOT EXISTS idx_attempt_time 
        ON donation_attempts(attempt_time)
    ''')
    
    conn.commit()
    conn.close()

# Initialize database when module loads
init_db()

def check_rate_limit(ip_address):
    """
    Check if the IP address has exceeded the daily limit (3 donations per day)
    """
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # Get today's date
    today = datetime.now().strftime('%Y-%m-%d')
    
    # Count attempts from this IP today
    cursor.execute('''
        SELECT COUNT(*) FROM donation_attempts 
        WHERE ip_address = ? 
        AND date(attempt_time) = ?
    ''', (ip_address, today))
    
    count = cursor.fetchone()[0]
    conn.close()
    
    return count < 3  # Allow up to 3 donations per day

def record_attempt(ip_address, amount, email):
    """Record a donation attempt"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO donation_attempts (ip_address, amount, email)
        VALUES (?, ?, ?)
    ''', (ip_address, amount, email))
    
    conn.commit()
    conn.close()

def save_donation(donation_data, ip_address):
    """Save donation to database"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO donations (
            first_name, last_name, email, phone, 
            donation_type, amount, message, newsletter
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        donation_data.get('firstName', ''),
        donation_data.get('lastName', ''),
        donation_data.get('email', ''),
        donation_data.get('phone', ''),
        donation_data.get('donationType', 'one-time'),
        donation_data.get('amount', '0'),
        donation_data.get('message', ''),
        1 if donation_data.get('newsletter') else 0
    ))
    
    donation_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return donation_id

@donate_bp.route('/donate', methods=['POST'])
def process_donation():
    """
    Process a donation submission
    """
    try:
        # Get client IP
        ip_address = request.remote_addr or request.headers.get('X-Forwarded-For', 'unknown')
        
        # Get request data
        data = request.get_json()
        
        if not data:
            return jsonify({
                'error': 'Invalid request',
                'message': 'No data provided'
            }), 400
        
        # Validate required fields
        required_fields = ['firstName', 'lastName', 'email', 'amount']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'error': 'Missing required field',
                    'message': f'{field} is required'
                }), 400
        
        # Validate email format
        import re
        email_pattern = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
        if not email_pattern.match(data['email']):
            return jsonify({
                'error': 'Invalid email',
                'message': 'Please provide a valid email address'
            }), 400
        
        # Validate amount
        try:
            amount = float(data['amount'])
            if amount <= 0:
                raise ValueError
        except (ValueError, TypeError):
            return jsonify({
                'error': 'Invalid amount',
                'message': 'Please provide a valid donation amount'
            }), 400
        
        # Check rate limit
        if not check_rate_limit(ip_address):
            remaining_time = get_remaining_time(ip_address)
            return jsonify({
                'error': 'Rate limit exceeded',
                'message': f'You have reached the maximum of 3 donations per day. Please try again in {remaining_time}.'
            }), 429
        
        # Record the attempt
        record_attempt(ip_address, str(amount), data['email'])
        
        # Save donation to database
        donation_id = save_donation(data, ip_address)
        
        # Send email notification to admin
        try:
            EmailService.send_donation_notification_to_admin(data)
            logger.info(f"Admin notification sent for donation #{donation_id}")
        except Exception as e:
            logger.error(f"Failed to send admin notification: {str(e)}")

        # Send receipt to DONOR
        try:
            EmailService.send_donation_receipt_to_donor(data)
            logger.info(f"Receipt sent to donor {data.get('email')} for donation #{donation_id}")
        except Exception as e:
            logger.error(f"Failed to send donor receipt: {str(e)}")
        
        return jsonify({
            'success': True,
            'message': 'Donation recorded successfully',
            'donation_id': donation_id
        }), 200
        
    except Exception as e:
        logger.error(f"Error processing donation: {str(e)}")
        return jsonify({
            'error': 'Server error',
            'message': 'An error occurred while processing your donation. Please try again.'
        }), 500

@donate_bp.route('/donate/stats', methods=['GET'])
def get_donation_stats():
    """Get donation statistics (for admin use)"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # Get today's stats
    today = datetime.now().strftime('%Y-%m-%d')
    cursor.execute('''
        SELECT COUNT(*), SUM(CAST(amount AS FLOAT))
        FROM donations 
        WHERE date(created_at) = ? AND status = 'pending'
    ''', (today,))
    
    count, total = cursor.fetchone()
    
    conn.close()
    
    return jsonify({
        'today_count': count or 0,
        'today_total': total or 0,
        'timestamp': datetime.now().isoformat()
    })

def get_remaining_time(ip_address):
    """Calculate remaining time until rate limit resets"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    today = datetime.now().strftime('%Y-%m-%d')
    cursor.execute('''
        SELECT attempt_time FROM donation_attempts 
        WHERE ip_address = ? AND date(attempt_time) = ?
        ORDER BY attempt_time ASC
        LIMIT 1
    ''', (ip_address, today))
    
    result = cursor.fetchone()
    conn.close()
    
    if result:
        first_attempt = datetime.strptime(result[0], '%Y-%m-%d %H:%M:%S')
        reset_time = first_attempt + timedelta(days=1)
        remaining = reset_time - datetime.now()
        hours = remaining.seconds // 3600
        minutes = (remaining.seconds % 3600) // 60
        return f"{hours} hours and {minutes} minutes"
    
    return "24 hours"