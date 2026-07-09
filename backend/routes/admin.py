from flask import Blueprint, request, jsonify, send_file, session
from functools import wraps
import sqlite3
import os
import logging

logger = logging.getLogger(__name__)

admin_bp = Blueprint('admin', __name__)

# Simple admin credentials (move to .env in production)
ADMIN_USERNAME = os.getenv('ADMIN_USERNAME', 'admin')
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', 'green2024')

def login_required(f):
    """Decorator to protect admin routes"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('admin_logged_in'):
            return jsonify({'error': 'Unauthorized', 'message': 'Please login first'}), 401
        return f(*args, **kwargs)
    return decorated_function

@admin_bp.route('/admin/login', methods=['POST'])
def admin_login():
    """Admin login endpoint"""
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'Invalid request'}), 400
    
    username = data.get('username')
    password = data.get('password')
    
    if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
        session['admin_logged_in'] = True
        session.permanent = True
        return jsonify({'success': True, 'message': 'Login successful'}), 200
    
    return jsonify({'error': 'Invalid credentials'}), 401

@admin_bp.route('/admin/logout', methods=['POST'])
def admin_logout():
    """Admin logout endpoint"""
    session.pop('admin_logged_in', None)
    return jsonify({'success': True, 'message': 'Logged out'}), 200

@admin_bp.route('/admin/check', methods=['GET'])
def admin_check():
    """Check if admin is logged in"""
    if session.get('admin_logged_in'):
        return jsonify({'authenticated': True}), 200
    return jsonify({'authenticated': False}), 401

@admin_bp.route('/admin/course-applications', methods=['GET'])
@login_required
def get_all_course_applications():
    """Get all course applications with file info (admin only)"""
    try:
        db_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'course_applications.db')
        
        if not os.path.exists(db_path):
            return jsonify({'applications': []}), 200
            
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, full_name, email, phone, course_name, 
                   preferred_date, experience_level, message,
                   medical_certificate_path, experience_certificate_path,
                   status, created_at 
            FROM course_applications 
            ORDER BY created_at DESC
        ''')
        
        applications = []
        for row in cursor.fetchall():
            medical_path = row[8]
            experience_path = row[9]
            
            applications.append({
                'id': row[0],
                'full_name': row[1],
                'email': row[2],
                'phone': row[3],
                'course_name': row[4],
                'preferred_date': row[5],
                'experience_level': row[6],
                'message': row[7],
                'medical_certificate': {
                    'exists': bool(medical_path),
                    'filename': os.path.basename(medical_path) if medical_path else None,
                    'path': medical_path
                },
                'experience_certificate': {
                    'exists': bool(experience_path),
                    'filename': os.path.basename(experience_path) if experience_path else None,
                    'path': experience_path
                },
                'status': row[10],
                'created_at': row[11]
            })
        
        conn.close()
        return jsonify({'applications': applications}), 200
        
    except Exception as e:
        logger.error(f"Error fetching applications: {str(e)}")
        return jsonify({'error': 'Failed to fetch applications'}), 500

@admin_bp.route('/admin/course-applications/<int:application_id>/download/<file_type>', methods=['GET'])
@login_required
def download_application_file(application_id, file_type):
    """Download a specific file from an application (admin only)"""
    try:
        db_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'course_applications.db')
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT medical_certificate_path, experience_certificate_path
            FROM course_applications WHERE id = ?
        ''', (application_id,))
        
        result = cursor.fetchone()
        conn.close()
        
        if not result:
            return jsonify({'error': 'Application not found'}), 404
        
        if file_type == 'medical':
            filepath = result[0]
        elif file_type == 'experience':
            filepath = result[1]
        else:
            return jsonify({'error': 'Invalid file type'}), 400
        
        if not filepath or not os.path.exists(filepath):
            return jsonify({'error': 'File not found'}), 404
        
        return send_file(filepath, as_attachment=True)
        
    except Exception as e:
        logger.error(f"Error downloading file: {str(e)}")
        return jsonify({'error': 'Failed to download file'}), 500

@admin_bp.route('/admin/volunteer-applications', methods=['GET'])
@login_required
def get_all_volunteer_applications():
    """Get all volunteer applications with file info (admin only)"""
    try:
        db_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'volunteer_applications.db')
        
        if not os.path.exists(db_path):
            return jsonify({'applications': []}), 200
            
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, full_name, email, program_type, week_selection, 
                   message, medical_certificate_path, status, created_at 
            FROM volunteer_applications 
            ORDER BY created_at DESC
        ''')
        
        applications = []
        for row in cursor.fetchall():
            medical_path = row[6]
            
            applications.append({
                'id': row[0],
                'full_name': row[1],
                'email': row[2],
                'program_type': row[3],
                'week_selection': row[4],
                'message': row[5],
                'medical_certificate': {
                    'exists': bool(medical_path),
                    'filename': os.path.basename(medical_path) if medical_path else None,
                    'path': medical_path
                },
                'status': row[7],
                'created_at': row[8]
            })
        
        conn.close()
        return jsonify({'applications': applications}), 200
        
    except Exception as e:
        logger.error(f"Error fetching applications: {str(e)}")
        return jsonify({'error': 'Failed to fetch applications'}), 500

@admin_bp.route('/admin/volunteer-applications/<int:application_id>/download', methods=['GET'])
@login_required
def download_volunteer_file(application_id):
    """Download medical certificate from volunteer application (admin only)"""
    try:
        db_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'volunteer_applications.db')
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT medical_certificate_path FROM volunteer_applications WHERE id = ?
        ''', (application_id,))
        
        result = cursor.fetchone()
        conn.close()
        
        if not result or not result[0]:
            return jsonify({'error': 'File not found'}), 404
        
        filepath = result[0]
        
        if not os.path.exists(filepath):
            return jsonify({'error': 'File not found'}), 404
        
        return send_file(filepath, as_attachment=True)
        
    except Exception as e:
        logger.error(f"Error downloading file: {str(e)}")
        return jsonify({'error': 'Failed to download file'}), 500