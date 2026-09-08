from flask import Blueprint, request, jsonify
from app.chatbot.chatbot_service import ChatbotService
import logging

logger = logging.getLogger(__name__)
chatbot_bp = Blueprint('chatbot', __name__, url_prefix='/api/chatbot')
chatbot_service = ChatbotService()

@chatbot_bp.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'service': 'chatbot'}), 200

@chatbot_bp.route('/message', methods=['POST'])
def send_message():
    """
    Send a message to the chatbot
    Expected JSON: {
        "user_id": str,
        "message": str,
        "context": {"products": [...], "user_preferences": {...}} (optional)
    }
    """
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        message = data.get('message')
        context = data.get('context', {})

        if not user_id or not message:
            return jsonify({'error': 'user_id and message are required'}), 400

        response = chatbot_service.send_message(user_id, message, context)
        
        return jsonify({
            'success': True,
            'user_id': user_id,
            'message': message,
            'response': response
        }), 200
    except Exception as e:
        logger.error(f"Error in send_message: {str(e)}")
        return jsonify({'error': str(e)}), 500

@chatbot_bp.route('/conversation/<user_id>', methods=['GET'])
def get_conversation(user_id):
    """
    Get conversation history for a user
    """
    try:
        history = chatbot_service.get_conversation_history(user_id)
        return jsonify({
            'success': True,
            'user_id': user_id,
            'conversation': history
        }), 200
    except Exception as e:
        logger.error(f"Error getting conversation: {str(e)}")
        return jsonify({'error': str(e)}), 500

@chatbot_bp.route('/clear/<user_id>', methods=['POST'])
def clear_conversation(user_id):
    """
    Clear conversation history for a user
    """
    try:
        chatbot_service.clear_conversation(user_id)
        return jsonify({
            'success': True,
            'message': f'Conversation cleared for user {user_id}'
        }), 200
    except Exception as e:
        logger.error(f"Error clearing conversation: {str(e)}")
        return jsonify({'error': str(e)}), 500

@chatbot_bp.route('/recommend', methods=['POST'])
def recommend():
    """
    Generate product recommendation text
    Expected JSON: {"products": [{"name": str, "price": float}]}
    """
    try:
        data = request.get_json()
        products = data.get('products', [])

        if not products:
            return jsonify({'error': 'products list is required'}), 400

        recommendation = chatbot_service.generate_product_recommendation(products)
        
        return jsonify({
            'success': True,
            'recommendation': recommendation
        }), 200
    except Exception as e:
        logger.error(f"Error generating recommendation: {str(e)}")
        return jsonify({'error': str(e)}), 500
