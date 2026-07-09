from flask import Blueprint, request, jsonify, current_app
from datetime import datetime, timedelta
from utils.email_service import EmailService
import sqlite3
import os
import logging
import re

logger = logging.getLogger(__name__)

courses_bp = Blueprint('courses', __name__)

# Database setup
DATABASE_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'course_applications.db')

def init_db():
    """Initialize the database and create tables if they don't exist"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # Table for tracking application attempts (rate limiting)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS course_application_attempts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            attempt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            course_name TEXT
        )
    ''')
    
    # Table for storing course applications
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS course_applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            course_name TEXT NOT NULL,
            preferred_date TEXT,
            message TEXT,
            experience_level TEXT,
            medical_certificate_path TEXT,
            experience_certificate_path TEXT,
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create indexes for faster queries
    cursor.execute('''
        CREATE INDEX IF NOT EXISTS idx_course_email 
        ON course_application_attempts(email)
    ''')
    
    cursor.execute('''
        CREATE INDEX IF NOT EXISTS idx_course_attempt_time 
        ON course_application_attempts(attempt_time)
    ''')
    
    conn.commit()
    conn.close()

# Initialize database when module loads
init_db()

def check_rate_limit(email):
    """Check if the email has exceeded the daily limit"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    today = datetime.now().strftime('%Y-%m-%d')
    
    cursor.execute('''
        SELECT COUNT(*) FROM course_application_attempts 
        WHERE email = ? 
        AND date(attempt_time) = ?
    ''', (email, today))
    
    count = cursor.fetchone()[0]
    conn.close()
    
    return count < 3

def record_attempt(email, course_name):
    """Record an application attempt"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO course_application_attempts (email, course_name)
        VALUES (?, ?)
    ''', (email, course_name))
    
    conn.commit()
    conn.close()

def save_application(application_data):
    """Save course application to database"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO course_applications (
            full_name, email, phone, course_name, 
            preferred_date, message, experience_level,
            medical_certificate_path, experience_certificate_path
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        application_data.get('full_name', ''),
        application_data.get('email', ''),
        application_data.get('phone', ''),
        application_data.get('course_name', ''),
        application_data.get('preferred_date', ''),
        application_data.get('message', ''),
        application_data.get('experience_level', 'beginner'),
        application_data.get('medical_certificate_path'),
        application_data.get('experience_certificate_path')
    ))
    
    application_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return application_id

def get_remaining_time(email):
    """Calculate remaining time until rate limit resets"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    today = datetime.now().strftime('%Y-%m-%d')
    cursor.execute('''
        SELECT attempt_time FROM course_application_attempts 
        WHERE email = ? AND date(attempt_time) = ?
        ORDER BY attempt_time ASC
        LIMIT 1
    ''', (email, today))
    
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

@courses_bp.route('/courses/apply', methods=['POST'])
def process_course_application():
    """
    Process a course application submission
    Rate limited to 3 applications per email per day
    """
    try:
        # Get form data (supports both JSON and multipart/form-data)
        if request.is_json:
            data = request.get_json()
        else:
            data = request.form
        
        if not data:
            return jsonify({
                'error': 'Invalid request',
                'message': 'No data provided'
            }), 400
        
        # Validate required fields
        required_fields = ['full_name', 'email', 'course_name']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'error': 'Missing required field',
                    'message': f'{field} is required'
                }), 400
        
        # Validate email format
        email_pattern = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
        if not email_pattern.match(data['email']):
            return jsonify({
                'error': 'Invalid email',
                'message': 'Please provide a valid email address'
            }), 400
        
        # Check rate limit
        if not check_rate_limit(data['email']):
            remaining_time = get_remaining_time(data['email'])
            return jsonify({
                'error': 'Rate limit exceeded',
                'message': f'You have reached the maximum of 3 applications per day. Please try again in {remaining_time}.'
            }), 429
        
        # Record the attempt
        record_attempt(data['email'], data['course_name'])
        
        # Handle file uploads
        medical_certificate_path = None
        experience_certificate_path = None
        
        upload_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'uploads', 'course_certificates')
        os.makedirs(upload_dir, exist_ok=True)
        
        # Handle medical certificate
        if 'medical_certificate' in request.files:
            file = request.files['medical_certificate']
            if file.filename:
                timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
                safe_name = "".join(c for c in data['full_name'] if c.isalnum() or c in (' ', '_')).rstrip()
                filename = f"medical_{timestamp}_{safe_name.replace(' ', '_')}_{file.filename}"
                filepath = os.path.join(upload_dir, filename)
                file.save(filepath)
                medical_certificate_path = filepath
        
        # Handle experience certificate
        if 'experience_certificate' in request.files:
            file = request.files['experience_certificate']
            if file.filename:
                timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
                safe_name = "".join(c for c in data['full_name'] if c.isalnum() or c in (' ', '_')).rstrip()
                filename = f"experience_{timestamp}_{safe_name.replace(' ', '_')}_{file.filename}"
                filepath = os.path.join(upload_dir, filename)
                file.save(filepath)
                experience_certificate_path = filepath
        
        # Prepare application data
        application_data = {
            'full_name': data.get('full_name'),
            'email': data.get('email'),
            'phone': data.get('phone', ''),
            'course_name': data.get('course_name'),
            'preferred_date': data.get('preferred_date', ''),
            'message': data.get('message', ''),
            'experience_level': data.get('experience_level', 'beginner'),
            'medical_certificate_path': medical_certificate_path,
            'experience_certificate_path': experience_certificate_path
        }
        
        # Save application to database
        application_id = save_application(application_data)
        
        # Prepare data for emails
        email_data = {
            'id': application_id,
            'full_name': data.get('full_name'),
            'email': data.get('email'),
            'phone': data.get('phone', 'Not provided'),
            'course_name': data.get('course_name'),
            'preferred_date': data.get('preferred_date', 'Not specified'),
            'experience_level': data.get('experience_level', 'Not specified'),
            'message': data.get('message', 'No additional message'),
            'has_medical_cert': bool(medical_certificate_path),
            'has_experience_cert': bool(experience_certificate_path),
            'created_at': datetime.now().strftime('%B %d, %Y at %I:%M %p')
        }
        
        # Send emails
        try:
            EmailService.send_course_notification_to_admin(email_data)
            logger.info(f"Admin notification sent for course application #{application_id}")
        except Exception as e:
            logger.error(f"Failed to send admin notification: {str(e)}")

        try:
            EmailService.send_course_receipt_to_applicant(email_data)
            logger.info(f"Receipt sent to applicant {data.get('email')} for application #{application_id}")
        except Exception as e:
            logger.error(f"Failed to send applicant receipt: {str(e)}")
        
        return jsonify({
            'success': True,
            'message': 'Application submitted successfully!',
            'application_id': application_id,
            'data': email_data
        }), 200
        
    except Exception as e:
        logger.error(f"Error processing course application: {str(e)}")
        return jsonify({
            'error': 'Server error',
            'message': 'An error occurred while processing your application. Please try again.'
        }), 500

@courses_bp.route('/courses/applications', methods=['GET'])
def get_course_applications():
    """Get all course applications (for admin)"""
    try:
        if not os.path.exists(DATABASE_PATH):
            return jsonify({'applications': []}), 200
            
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, full_name, email, phone, course_name, 
                   preferred_date, experience_level, status, created_at 
            FROM course_applications 
            ORDER BY created_at DESC
        ''')
        
        applications = []
        for row in cursor.fetchall():
            applications.append({
                'id': row[0],
                'full_name': row[1],
                'email': row[2],
                'phone': row[3],
                'course_name': row[4],
                'preferred_date': row[5],
                'experience_level': row[6],
                'status': row[7],
                'created_at': row[8]
            })
        
        conn.close()
        return jsonify({'applications': applications}), 200
        
    except Exception as e:
        logger.error(f"Error fetching course applications: {str(e)}")
        return jsonify({'error': 'Failed to fetch applications'}), 500