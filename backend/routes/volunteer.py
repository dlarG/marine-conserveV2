from flask import Blueprint, request, jsonify
from utils.email_service import EmailService
import sqlite3
from datetime import datetime
import os
import logging

logger = logging.getLogger(__name__)

volunteer_bp = Blueprint('volunteer', __name__)

def init_db():
    """Initialize the volunteer applications database"""
    db_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'volunteer_applications.db')
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS volunteer_applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            email TEXT NOT NULL,
            program_type TEXT NOT NULL,
            week_selection TEXT NOT NULL,
            message TEXT,
            medical_certificate_path TEXT,
            confirmation_checked INTEGER DEFAULT 0,
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()
    return db_path

@volunteer_bp.route('/volunteer/apply', methods=['POST'])
def volunteer_apply():
    """
    Process volunteer application for Coral Restoration program
    """
    try:
        # Initialize database
        db_path = init_db()
        
        # Get form data
        full_name = request.form.get('full_name', '').strip()
        email = request.form.get('email', '').strip()
        program_type = request.form.get('program_type', '').strip()
        week_selection = request.form.get('week_selection', '').strip()
        message = request.form.get('message', '').strip()
        confirmation_checked = request.form.get('confirmation_checked', '0')
        
        # Validate required fields
        errors = []
        if not full_name:
            errors.append('Full name is required')
        if not email:
            errors.append('Email is required')
        if not program_type:
            errors.append('Program type is required')
        if not week_selection:
            errors.append('Week selection is required')
        if confirmation_checked != '1':
            errors.append('You must confirm your email address')
        
        if errors:
            return jsonify({'error': 'Validation failed', 'messages': errors}), 400
        
        # Handle file upload
        medical_certificate_path = None
        if 'medical_certificate' in request.files:
            file = request.files['medical_certificate']
            if file.filename:
                # Create uploads directory if it doesn't exist
                upload_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'uploads', 'medical_certificates')
                os.makedirs(upload_dir, exist_ok=True)
                
                # Generate unique filename
                timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
                filename = f"{timestamp}_{full_name.replace(' ', '_')}_{file.filename}"
                filepath = os.path.join(upload_dir, filename)
                file.save(filepath)
                medical_certificate_path = filepath
        
        # Save to database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO volunteer_applications 
            (full_name, email, program_type, week_selection, message, medical_certificate_path, confirmation_checked, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
        ''', (full_name, email, program_type, week_selection, message, medical_certificate_path, int(confirmation_checked)))
        
        application_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        # Prepare data for emails
        application_data = {
            'id': application_id,
            'full_name': full_name,
            'email': email,
            'program_type': program_type,
            'week_selection': week_selection,
            'message': message or 'No additional message',
            'created_at': datetime.now().strftime('%B %d, %Y at %I:%M %p')
        }
        
        # Send emails
        try:
            # Send notification to admin
            EmailService.send_volunteer_notification_to_admin(application_data)
            logger.info(f"Admin notification sent for volunteer application #{application_id}")
            
            # Send receipt to applicant
            EmailService.send_volunteer_receipt_to_applicant(application_data)
            logger.info(f"Receipt sent to volunteer applicant #{application_id}")
        except Exception as email_error:
            logger.error(f"Failed to send email: {str(email_error)}")
            # Don't fail the application if email fails
        
        return jsonify({
            'success': True,
            'message': 'Application submitted successfully!',
            'application_id': application_id,
            'data': application_data
        }), 200
        
    except Exception as e:
        logger.error(f"Error processing volunteer application: {str(e)}")
        return jsonify({'error': 'Failed to process application', 'message': str(e)}), 500

@volunteer_bp.route('/volunteer/applications', methods=['GET'])
def get_applications():
    """Get all volunteer applications (for admin)"""
    try:
        db_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'volunteer_applications.db')
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, full_name, email, program_type, week_selection, message, 
                   status, created_at 
            FROM volunteer_applications 
            ORDER BY created_at DESC
        ''')
        
        applications = []
        for row in cursor.fetchall():
            applications.append({
                'id': row[0],
                'full_name': row[1],
                'email': row[2],
                'program_type': row[3],
                'week_selection': row[4],
                'message': row[5],
                'status': row[6],
                'created_at': row[7]
            })
        
        conn.close()
        return jsonify({'applications': applications}), 200
        
    except Exception as e:
        logger.error(f"Error fetching applications: {str(e)}")
        return jsonify({'error': 'Failed to fetch applications'}), 500