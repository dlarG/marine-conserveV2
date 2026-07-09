from flask import Blueprint, request, jsonify, send_file, session
from functools import wraps
import sqlite3
import os
import logging

logger = logging.getLogger(__name__)

admin_bp = Blueprint('admin', __name__)

ADMIN_USERNAME = os.getenv('ADMIN_USERNAME', 'admin')
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', 'green2024')

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('admin_logged_in'):
            return jsonify({'error': 'Unauthorized', 'message': 'Please login first'}), 401
        return f(*args, **kwargs)
    return decorated_function

# ─── Auth ──────────────────────────────────────────────────────────────────────

@admin_bp.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid request'}), 400
    
    if data.get('username') == ADMIN_USERNAME and data.get('password') == ADMIN_PASSWORD:
        session['admin_logged_in'] = True
        session.permanent = True
        return jsonify({'success': True, 'message': 'Login successful'}), 200
    
    return jsonify({'error': 'Invalid credentials'}), 401

@admin_bp.route('/admin/logout', methods=['POST'])
def admin_logout():
    session.pop('admin_logged_in', None)
    return jsonify({'success': True, 'message': 'Logged out'}), 200

@admin_bp.route('/admin/check', methods=['GET'])
def admin_check():
    return jsonify({'authenticated': bool(session.get('admin_logged_in'))}), 200

# ─── Helper ────────────────────────────────────────────────────────────────────

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

def get_db_path(name):
    return os.path.join(BASE_DIR, name)

def fetch_all(db_name, table, order_by='created_at DESC'):
    db_path = get_db_path(db_name)
    if not os.path.exists(db_path):
        return []
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute(f'SELECT * FROM {table} ORDER BY {order_by}')
    rows = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return rows

def update_status(db_name, table, item_id, status):
    db_path = get_db_path(db_name)
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute(f'UPDATE {table} SET status = ? WHERE id = ?', (status, item_id))
    conn.commit()
    conn.close()

def delete_item(db_name, table, item_id):
    db_path = get_db_path(db_name)
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute(f'DELETE FROM {table} WHERE id = ?', (item_id,))
    conn.commit()
    conn.close()

# ─── Stats ─────────────────────────────────────────────────────────────────────

@admin_bp.route('/admin/stats', methods=['GET'])
@login_required
def get_all_stats():
    """Get combined stats from all databases"""
    stats = {
        'donations': {'total': 0, 'today': 0},
        'course_applications': {'total': 0, 'today': 0},
        'volunteer_applications': {'total': 0, 'today': 0},
        'general_applications': {'total': 0, 'today': 0},
        'contact_messages': {'total': 0, 'today': 0, 'unread': 0},
    }
    
    today = __import__('datetime').datetime.now().strftime('%Y-%m-%d')
    
    configs = [
        ('donations.db', 'donations', 'donations'),
        ('course_applications.db', 'course_applications', 'course_applications'),
        ('volunteer_applications.db', 'volunteer_applications', 'volunteer_applications'),
        ('applications.db', 'applications', 'general_applications'),
        ('contact_messages.db', 'contact_messages', 'contact_messages'),
    ]
    
    for db_name, table, key in configs:
        db_path = get_db_path(db_name)
        if not os.path.exists(db_path):
            continue
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        cursor.execute(f'SELECT COUNT(*) FROM {table}')
        stats[key]['total'] = cursor.fetchone()[0]
        
        cursor.execute(f"SELECT COUNT(*) FROM {table} WHERE date(created_at) = ?", (today,))
        stats[key]['today'] = cursor.fetchone()[0]
        
        if key == 'contact_messages':
            cursor.execute(f"SELECT COUNT(*) FROM {table} WHERE status = 'unread'")
            stats[key]['unread'] = cursor.fetchone()[0]
        
        conn.close()
    
    return jsonify(stats), 200

# ─── Course Applications ───────────────────────────────────────────────────────

@admin_bp.route('/admin/course-applications', methods=['GET'])
@login_required
def get_all_course_applications():
    try:
        rows = fetch_all('course_applications.db', 'course_applications')
        applications = []
        for row in rows:
            med_path = row.get('medical_certificate_path')
            exp_path = row.get('experience_certificate_path')
            applications.append({
                **row,
                'medical_certificate': {
                    'exists': bool(med_path),
                    'filename': os.path.basename(med_path) if med_path else None,
                },
                'experience_certificate': {
                    'exists': bool(exp_path),
                    'filename': os.path.basename(exp_path) if exp_path else None,
                }
            })
        return jsonify({'applications': applications}), 200
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/admin/course-applications/<int:app_id>/status', methods=['PUT'])
@login_required
def update_course_status(app_id):
    data = request.get_json()
    update_status('course_applications.db', 'course_applications', app_id, data.get('status', 'pending'))
    return jsonify({'success': True}), 200

@admin_bp.route('/admin/course-applications/<int:app_id>', methods=['DELETE'])
@login_required
def delete_course_application(app_id):
    delete_item('course_applications.db', 'course_applications', app_id)
    return jsonify({'success': True}), 200

@admin_bp.route('/admin/course-applications/<int:app_id>/download/<file_type>', methods=['GET'])
@login_required
def download_course_file(app_id, file_type):
    db_path = get_db_path('course_applications.db')
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('SELECT medical_certificate_path, experience_certificate_path FROM course_applications WHERE id = ?', (app_id,))
    result = cursor.fetchone()
    conn.close()
    
    if not result:
        return jsonify({'error': 'Not found'}), 404
    
    filepath = result[0] if file_type == 'medical' else result[1]
    if not filepath or not os.path.exists(filepath):
        return jsonify({'error': 'File not found'}), 404
    
    return send_file(filepath, as_attachment=True)

# ─── Volunteer Applications ────────────────────────────────────────────────────

@admin_bp.route('/admin/volunteer-applications', methods=['GET'])
@login_required
def get_all_volunteer_applications():
    try:
        rows = fetch_all('volunteer_applications.db', 'volunteer_applications')
        applications = []
        for row in rows:
            med_path = row.get('medical_certificate_path')
            applications.append({
                **row,
                'medical_certificate': {
                    'exists': bool(med_path),
                    'filename': os.path.basename(med_path) if med_path else None,
                }
            })
        return jsonify({'applications': applications}), 200
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/admin/volunteer-applications/<int:app_id>/status', methods=['PUT'])
@login_required
def update_volunteer_status(app_id):
    data = request.get_json()
    update_status('volunteer_applications.db', 'volunteer_applications', app_id, data.get('status', 'pending'))
    return jsonify({'success': True}), 200

@admin_bp.route('/admin/volunteer-applications/<int:app_id>', methods=['DELETE'])
@login_required
def delete_volunteer_application(app_id):
    delete_item('volunteer_applications.db', 'volunteer_applications', app_id)
    return jsonify({'success': True}), 200

@admin_bp.route('/admin/volunteer-applications/<int:app_id>/download', methods=['GET'])
@login_required
def download_volunteer_file(app_id):
    db_path = get_db_path('volunteer_applications.db')
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('SELECT medical_certificate_path FROM volunteer_applications WHERE id = ?', (app_id,))
    result = cursor.fetchone()
    conn.close()
    
    if not result or not result[0] or not os.path.exists(result[0]):
        return jsonify({'error': 'File not found'}), 404
    
    return send_file(result[0], as_attachment=True)

# ─── General Applications (Apply Page) ─────────────────────────────────────────

@admin_bp.route('/admin/general-applications', methods=['GET'])
@login_required
def get_all_general_applications():
    try:
        rows = fetch_all('applications.db', 'applications')
        return jsonify({'applications': rows}), 200
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/admin/general-applications/<int:app_id>/status', methods=['PUT'])
@login_required
def update_general_status(app_id):
    data = request.get_json()
    update_status('applications.db', 'applications', app_id, data.get('status', 'pending'))
    return jsonify({'success': True}), 200

@admin_bp.route('/admin/general-applications/<int:app_id>', methods=['DELETE'])
@login_required
def delete_general_application(app_id):
    delete_item('applications.db', 'applications', app_id)
    return jsonify({'success': True}), 200

# ─── Donations ─────────────────────────────────────────────────────────────────

@admin_bp.route('/admin/donations', methods=['GET'])
@login_required
def get_all_donations():
    try:
        rows = fetch_all('donations.db', 'donations')
        return jsonify({'donations': rows}), 200
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/admin/donations/<int:donation_id>/status', methods=['PUT'])
@login_required
def update_donation_status(donation_id):
    data = request.get_json()
    update_status('donations.db', 'donations', donation_id, data.get('status', 'pending'))
    return jsonify({'success': True}), 200

@admin_bp.route('/admin/donations/<int:donation_id>', methods=['DELETE'])
@login_required
def delete_donation(donation_id):
    delete_item('donations.db', 'donations', donation_id)
    return jsonify({'success': True}), 200

# ─── Contact Messages ──────────────────────────────────────────────────────────

@admin_bp.route('/admin/contact-messages', methods=['GET'])
@login_required
def get_all_contact_messages():
    try:
        rows = fetch_all('contact_messages.db', 'contact_messages')
        return jsonify({'messages': rows}), 200
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/admin/contact-messages/<int:msg_id>/status', methods=['PUT'])
@login_required
def update_message_status(msg_id):
    data = request.get_json()
    update_status('contact_messages.db', 'contact_messages', msg_id, data.get('status', 'read'))
    return jsonify({'success': True}), 200

@admin_bp.route('/admin/contact-messages/<int:msg_id>', methods=['DELETE'])
@login_required
def delete_contact_message(msg_id):
    delete_item('contact_messages.db', 'contact_messages', msg_id)
    return jsonify({'success': True}), 200