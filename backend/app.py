from flask import Flask
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config['SECRET_KEY'] = os.urandom(24)
    app.config['SMTP_SERVER'] = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
    app.config['SMTP_PORT'] = int(os.getenv('SMTP_PORT', 587))
    app.config['SMTP_USE_TLS'] = os.getenv('SMTP_USE_TLS', 'true').lower() == 'true'
    app.config['SMTP_USERNAME'] = os.getenv('SMTP_USERNAME')
    app.config['SMTP_PASSWORD'] = os.getenv('SMTP_PASSWORD')
    app.config['SMTP_FROM_EMAIL'] = os.getenv('SMTP_FROM_EMAIL')
    app.config['SMTP_FROM_NAME'] = os.getenv('SMTP_FROM_NAME', 'GREEN Inc. Marine Conservation')
    app.config['CONTACT_EMAIL'] = os.getenv('CONTACT_EMAIL')
    
    # Initialize extensions
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    # Rate limiter
    limiter = Limiter(
        get_remote_address,
        app=app,
        default_limits=["200 per day", "50 per hour"],
        storage_uri="memory://",
    )
    
    # Register blueprints
    from routes.donate import donate_bp
    from routes.contact import contact_bp
    from routes.volunteer import volunteer_bp
    from routes.courses import courses_bp
    
    app.register_blueprint(donate_bp, url_prefix='/api')
    app.register_blueprint(contact_bp, url_prefix='/api')
    app.register_blueprint(volunteer_bp, url_prefix='/api')
    app.register_blueprint(courses_bp, url_prefix='/api')
    
    # Health check endpoint
    @app.route('/api/health')
    def health_check():
        return {'status': 'healthy', 'message': 'GREEN Inc. API is running'}
    
    # Error handlers
    @app.errorhandler(429)
    def ratelimit_handler(e):
        return {
            'error': 'Rate limit exceeded',
            'message': 'You have exceeded the allowed number of requests. Please try again later.',
            'retry_after': e.description
        }, 429
    
    @app.errorhandler(500)
    def internal_error(e):
        return {
            'error': 'Internal server error',
            'message': 'Something went wrong. Please try again later.'
        }, 500
    
    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.getenv('PORT', 10000))
    debug = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(host='0.0.0.0', port=port, debug=debug)