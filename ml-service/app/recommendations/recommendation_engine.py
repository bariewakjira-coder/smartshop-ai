import os
import pickle
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler
import logging

logger = logging.getLogger(__name__)

class RecommendationEngine:
    """Collaborative Filtering Recommendation Engine"""

    def __init__(self, model_path='./models'):
        self.model_path = model_path
        self.user_item_matrix = None
        self.product_ids = []
        self.user_ids = []
        self.similarity_matrix = None
        self.scaler = StandardScaler()
        os.makedirs(model_path, exist_ok=True)

    def build_user_item_matrix(self, interactions: list) -> np.ndarray:
        """
        Build user-item interaction matrix from interaction data
        interactions: list of {'user_id': int, 'product_id': int, 'rating': float}
        """
        try:
            # Create unique lists
            users = sorted(set(item['user_id'] for item in interactions))
            products = sorted(set(item['product_id'] for item in interactions))

            self.user_ids = users
            self.product_ids = products

            # Create matrix
            matrix = np.zeros((len(users), len(products)))

            # Fill matrix with ratings
            for interaction in interactions:
                user_idx = users.index(interaction['user_id'])
                product_idx = products.index(interaction['product_id'])
                matrix[user_idx, product_idx] = interaction.get('rating', 1.0)

            self.user_item_matrix = matrix
            logger.info(f"Built user-item matrix: {matrix.shape}")
            return matrix
        except Exception as e:
            logger.error(f"Error building user-item matrix: {str(e)}")
            raise

    def train(self, interactions: list):
        """
        Train the recommendation model
        """
        try:
            self.build_user_item_matrix(interactions)
            
            # Calculate product similarity using cosine similarity
            self.similarity_matrix = cosine_similarity(self.user_item_matrix.T)
            
            self.save_model()
            logger.info("Model trained successfully")
        except Exception as e:
            logger.error(f"Error training model: {str(e)}")
            raise

    def get_recommendations(self, user_id: int, n_recommendations: int = 5) -> list:
        """
        Get product recommendations for a user
        """
        try:
            if self.user_item_matrix is None:
                logger.warning("Model not trained yet")
                return []

            if user_id not in self.user_ids:
                logger.warning(f"User {user_id} not in training data")
                return self._get_popular_products(n_recommendations)

            user_idx = self.user_ids.index(user_id)
            user_ratings = self.user_item_matrix[user_idx]

            # Find similar users
            user_similarity = cosine_similarity([user_ratings], self.user_item_matrix)[0]
            similar_users_idx = np.argsort(user_similarity)[::-1][1:10]  # Top 9 similar users

            # Get products rated by similar users but not by current user
            recommendations = {}
            for sim_user_idx in similar_users_idx:
                sim_user_ratings = self.user_item_matrix[sim_user_idx]
                for product_idx, rating in enumerate(sim_user_ratings):
                    if user_ratings[product_idx] == 0 and rating > 0:
                        if product_idx not in recommendations:
                            recommendations[product_idx] = 0
                        recommendations[product_idx] += rating * user_similarity[sim_user_idx]

            # Sort and return top recommendations
            sorted_recs = sorted(recommendations.items(), key=lambda x: x[1], reverse=True)
            result = []
            for product_idx, score in sorted_recs[:n_recommendations]:
                result.append({
                    'product_id': self.product_ids[product_idx],
                    'score': float(score)
                })

            return result
        except Exception as e:
            logger.error(f"Error getting recommendations: {str(e)}")
            return []

    def _get_popular_products(self, n: int) -> list:
        """
        Get most popular products
        """
        if self.user_item_matrix is None:
            return []

        product_popularity = np.sum(self.user_item_matrix > 0, axis=0)
        popular_idx = np.argsort(product_popularity)[::-1][:n]
        
        return [{
            'product_id': self.product_ids[idx],
            'score': float(product_popularity[idx])
        } for idx in popular_idx]

    def save_model(self):
        """
        Save trained model to disk
        """
        try:
            model_data = {
                'user_item_matrix': self.user_item_matrix,
                'similarity_matrix': self.similarity_matrix,
                'user_ids': self.user_ids,
                'product_ids': self.product_ids
            }
            with open(os.path.join(self.model_path, 'recommendation_model.pkl'), 'wb') as f:
                pickle.dump(model_data, f)
            logger.info("Model saved successfully")
        except Exception as e:
            logger.error(f"Error saving model: {str(e)}")

    def load_model(self):
        """
        Load trained model from disk
        """
        try:
            model_file = os.path.join(self.model_path, 'recommendation_model.pkl')
            if os.path.exists(model_file):
                with open(model_file, 'rb') as f:
                    model_data = pickle.load(f)
                self.user_item_matrix = model_data['user_item_matrix']
                self.similarity_matrix = model_data['similarity_matrix']
                self.user_ids = model_data['user_ids']
                self.product_ids = model_data['product_ids']
                logger.info("Model loaded successfully")
            else:
                logger.warning("No saved model found")
        except Exception as e:
            logger.error(f"Error loading model: {str(e)}")
