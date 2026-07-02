from flask import Blueprint, request, jsonify
from datetime import datetime
from utils.email_service import EmailService
import sqlite3
import os
import logging

logger = logging.getLogger(__name__)

apply_bp = Blueprint('apply', __name__)

# Database setup
DATABASE_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'applications.db')

def init_db():
    """Initialize the database and create tables if they don't exist"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            date_of_birth TEXT,
            nationality TEXT,
            course TEXT,
            certification_level TEXT,
            number_of_dives TEXT,
            last_dive TEXT,
            education TEXT,
            future_education TEXT,
            occupation TEXT,
            marine_biology_experience TEXT,
            heard_from TEXT,
            programme_expectations TEXT,
            food_allergies TEXT,
            medical_conditions TEXT,
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

# Initialize database when module loads
init_db()

def save_application(data):
    """Save application to database"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO applications (
            name, email, date_of_birth, nationality, course,
            certification_level, number_of_dives, last_dive,
            education, future_education, occupation,
            marine_biology_experience, heard_from,
            programme_expectations, food_allergies, medical_conditions
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        data.get('name', ''),
        data.get('email', ''),
        data.get('dateOfBirth', ''),
        data.get('nationality', ''),
        data.get('course', ''),
        data.get('certificationLevel', ''),
        data.get('numberOfDives', ''),
        data.get('lastDive', ''),
        data.get('education', ''),
        data.get('futureEducation', ''),
        data.get('occupation', ''),
        data.get('marineBiologyExperience', ''),
        data.get('heardFrom', ''),
        data.get('programmeExpectations', ''),
        data.get('foodAllergies', ''),
        data.get('medicalConditions', '')
    ))
    
    application_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return application_id

@apply_bp.route('/apply', methods=['POST'])
def process_application():
    """
    Process a volunteer application
    """
    try:
        # Get form data (support both JSON and FormData)
        if request.is_json:
            data = request.get_json()
        else:
            data = request.form.to_dict()
        
        if not data:
            return jsonify({
                'error': 'Invalid request',
                'message': 'No data provided'
            }), 400
        
        # Validate required fields
        required_fields = ['name', 'email']
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
        
        # Save application to database
        application_id = save_application(data)
        
        # Send notification to admin
        try:
            EmailService.send_application_notification_to_admin(data, application_id)
            logger.info(f"Admin notification sent for application #{application_id}")
        except Exception as e:
            logger.error(f"Failed to send admin notification: {str(e)}")
        
        # Send receipt to applicant
        try:
            EmailService.send_application_receipt_to_applicant(data, application_id)
            logger.info(f"Receipt sent to applicant {data.get('email')} for application #{application_id}")
        except Exception as e:
            logger.error(f"Failed to send applicant receipt: {str(e)}")
        
        return jsonify({
            'success': True,
            'message': 'Application submitted successfully',
            'application_id': application_id
        }), 200
        
    except Exception as e:
        logger.error(f"Error processing application: {str(e)}")
        return jsonify({
            'error': 'Server error',
            'message': 'An error occurred while processing your application. Please try again.'
        }), 500