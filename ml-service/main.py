from app import create_app
from app.config import Config
import logging

if __name__ == '__main__':
    # Create Flask app
    app = create_app(Config.FLASK_ENV)
    
    # Run server
    logger = logging.getLogger(__name__)
    logger.info(f"Starting SmartShop AI ML Service on port {Config.PORT}")
    
    app.run(
        host='0.0.0.0',
        port=Config.PORT,
        debug=Config.DEBUG
    )
