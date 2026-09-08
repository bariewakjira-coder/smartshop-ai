import os
import logging
from flask import Flask, jsonify
from flask_cors import CORS
from app.config import config
from app.recommendations.routes import recommendation_bp
from app.chatbot.routes import chatbot_bp

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def create_app(config_name='development'):
    """
    Application factory
    """
    app = Flask(__name__)
    
    # Load config
    app.config.from_object(config[config_name])
    
    # Enable CORS
    CORS(app)
    
    # Register blueprints
    app.register_blueprint(recommendation_bp)
    app.register_blueprint(chatbot_bp)
    
    # Health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health():
        return jsonify({
            'status': 'healthy',
            'service': 'SmartShop AI ML Service',
            'version': '1.0.0'
        }), 200
    
    # 404 handler
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Endpoint not found'}), 404
    
    # 500 handler
    @app.errorhandler(500)
    def internal_error(error):
        logger.error(f'Internal error: {str(error)}')
        return jsonify({'error': 'Internal server error'}), 500
    
    return app
