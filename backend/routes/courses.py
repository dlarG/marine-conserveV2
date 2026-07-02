from flask import Blueprint, request, jsonify

courses_bp = Blueprint('courses', __name__)

@courses_bp.route('/courses', methods=['POST'])
def courses():
    # Placeholder for course registration
    return jsonify({'message': 'Courses endpoint ready'})