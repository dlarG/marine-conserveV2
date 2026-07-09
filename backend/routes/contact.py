from flask import Blueprint, request, jsonify, current_app
from datetime import datetime
from utils.email_service import EmailService
import sqlite3
import os
import logging
import re

logger = logging.getLogger(__name__)

contact_bp = Blueprint('contact', __name__)

# Database setup
DATABASE_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'contact_messages.db')

def init_db():
    """Initialize the contact messages database"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS contact_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            status TEXT DEFAULT 'unread',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

init_db()

def save_message(data):
    """Save contact message to database"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO contact_messages (name, email, subject, message)
        VALUES (?, ?, ?, ?)
    ''', (
        data.get('name', ''),
        data.get('email', ''),
        data.get('subject', ''),
        data.get('message', '')
    ))
    
    message_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return message_id

@contact_bp.route('/contact', methods=['POST'])
def submit_contact():
    """
    Process a contact form submission
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'error': 'Invalid request',
                'message': 'No data provided'
            }), 400
        
        # Validate required fields
        required_fields = ['name', 'email', 'subject', 'message']
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
        
        # Validate message length
        if len(data['message']) < 10:
            return jsonify({
                'error': 'Message too short',
                'message': 'Please provide a message with at least 10 characters'
            }), 400
        
        # Save to database
        message_id = save_message(data)
        
        # Prepare email data
        email_data = {
            'id': message_id,
            'name': data.get('name'),
            'email': data.get('email'),
            'subject': data.get('subject'),
            'message': data.get('message'),
            'created_at': datetime.now().strftime('%B %d, %Y at %I:%M %p')
        }
        
        # Send email notification to admin
        try:
            EmailService.send_contact_notification_to_admin(email_data)
            logger.info(f"Contact notification sent for message #{message_id}")
        except Exception as e:
            logger.error(f"Failed to send contact notification: {str(e)}")
        
        return jsonify({
            'success': True,
            'message': 'Your message has been sent successfully! We will get back to you soon.',
            'message_id': message_id
        }), 200
        
    except Exception as e:
        logger.error(f"Error processing contact message: {str(e)}")
        return jsonify({
            'error': 'Server error',
            'message': 'An error occurred while sending your message. Please try again.'
        }), 500

@contact_bp.route('/contact/messages', methods=['GET'])
def get_messages():
    """Get all contact messages (for admin)"""
    try:
        if not os.path.exists(DATABASE_PATH):
            return jsonify({'messages': []}), 200
            
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, name, email, subject, message, status, created_at 
            FROM contact_messages 
            ORDER BY created_at DESC
        ''')
        
        messages = []
        for row in cursor.fetchall():
            messages.append({
                'id': row[0],
                'name': row[1],
                'email': row[2],
                'subject': row[3],
                'message': row[4],
                'status': row[5],
                'created_at': row[6]
            })
        
        conn.close()
        return jsonify({'messages': messages}), 200
        
    except Exception as e:
        logger.error(f"Error fetching messages: {str(e)}")
        return jsonify({'error': 'Failed to fetch messages'}), 500