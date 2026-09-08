from flask import Blueprint, request, jsonify
from app.recommendations.recommendation_engine import RecommendationEngine
import logging

logger = logging.getLogger(__name__)
recommendation_bp = Blueprint('recommendations', __name__, url_prefix='/api/recommendations')
recommendation_engine = RecommendationEngine()

@recommendation_bp.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'service': 'recommendations'}), 200

@recommendation_bp.route('/get-recommendations', methods=['POST'])
def get_recommendations():
    """
    Get recommendations for a user
    Expected JSON: {"user_id": int, "n_recommendations": int (optional)}
    """
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        n_recommendations = data.get('n_recommendations', 5)

        if not user_id:
            return jsonify({'error': 'user_id is required'}), 400

        recommendations = recommendation_engine.get_recommendations(user_id, n_recommendations)
        
        return jsonify({
            'success': True,
            'user_id': user_id,
            'recommendations': recommendations
        }), 200
    except Exception as e:
        logger.error(f"Error in get_recommendations: {str(e)}")
        return jsonify({'error': str(e)}), 500

@recommendation_bp.route('/train', methods=['POST'])
def train_model():
    """
    Train the recommendation model
    Expected JSON: {"interactions": [{"user_id": int, "product_id": int, "rating": float}]}
    """
    try:
        data = request.get_json()
        interactions = data.get('interactions', [])

        if not interactions:
            return jsonify({'error': 'interactions data is required'}), 400

        recommendation_engine.train(interactions)
        
        return jsonify({
            'success': True,
            'message': 'Model trained successfully',
            'data_points': len(interactions)
        }), 200
    except Exception as e:
        logger.error(f"Error training model: {str(e)}")
        return jsonify({'error': str(e)}), 500

@recommendation_bp.route('/load-model', methods=['POST'])
def load_model():
    """
    Load a saved recommendation model
    """
    try:
        recommendation_engine.load_model()
        return jsonify({
            'success': True,
            'message': 'Model loaded successfully'
        }), 200
    except Exception as e:
        logger.error(f"Error loading model: {str(e)}")
        return jsonify({'error': str(e)}), 500
