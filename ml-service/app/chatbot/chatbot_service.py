import logging
from typing import List, Dict
import openai
from app.config import Config

logger = logging.getLogger(__name__)
openai.api_key = Config.OPENAI_API_KEY

class ChatbotService:
    """AI Chatbot using OpenAI GPT-4"""

    def __init__(self):
        self.conversation_history = {}
        self.system_prompt = """
You are SmartShop AI Assistant, a helpful and friendly e-commerce customer support agent.
Your responsibilities are:
1. Help customers find products
2. Answer questions about products
3. Provide shopping recommendations
4. Assist with orders and returns
5. Be professional and courteous

Always provide accurate information and offer to help further.
        """

    def send_message(self, user_id: str, user_message: str, context: Dict = None) -> str:
        """
        Send a message to the chatbot and get a response
        
        Args:
            user_id: Unique user identifier
            user_message: Message from user
            context: Additional context (product info, user preferences, etc.)
        
        Returns:
            Chatbot response
        """
        try:
            # Initialize conversation for new user
            if user_id not in self.conversation_history:
                self.conversation_history[user_id] = []

            # Build context if provided
            context_str = ""
            if context:
                if 'products' in context:
                    context_str += f"\nAvailable products: {context['products']}"
                if 'user_preferences' in context:
                    context_str += f"\nUser preferences: {context['user_preferences']}"

            # Add user message to history
            self.conversation_history[user_id].append({
                "role": "user",
                "content": user_message
            })

            # Prepare messages for API
            messages = [
                {"role": "system", "content": self.system_prompt + context_str}
            ] + self.conversation_history[user_id]

            # Call OpenAI API
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=messages,
                temperature=0.7,
                max_tokens=500
            )

            bot_response = response.choices[0].message.content

            # Add bot response to history
            self.conversation_history[user_id].append({
                "role": "assistant",
                "content": bot_response
            })

            # Keep conversation history manageable (last 10 exchanges)
            if len(self.conversation_history[user_id]) > 20:
                self.conversation_history[user_id] = self.conversation_history[user_id][-20:]

            logger.info(f"Message processed for user {user_id}")
            return bot_response

        except Exception as e:
            logger.error(f"Error in chatbot: {str(e)}")
            return "I apologize, but I'm having trouble processing your request. Please try again later."

    def clear_conversation(self, user_id: str):
        """
        Clear conversation history for a user
        """
        if user_id in self.conversation_history:
            del self.conversation_history[user_id]
            logger.info(f"Conversation cleared for user {user_id}")

    def get_conversation_history(self, user_id: str) -> List[Dict]:
        """
        Get conversation history for a user
        """
        return self.conversation_history.get(user_id, [])

    def generate_product_recommendation(self, products: List[Dict]) -> str:
        """
        Generate a natural language product recommendation
        """
        try:
            product_list = "\n".join([f"- {p['name']}: ${p['price']}" for p in products])
            prompt = f"Based on these products, provide a friendly recommendation:\n{product_list}"
            
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a friendly shopping assistant."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=200
            )
            
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"Error generating recommendation: {str(e)}")
            return "I'd be happy to help you find the perfect products!"
