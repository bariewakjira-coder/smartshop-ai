import { query } from '../config/database.js';
import { logger } from '../config/logger.js';

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await query(
      'SELECT id, email, full_name, avatar, created_at FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    logger.error(`Get profile error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, avatar } = req.body;

    const result = await query(
      'UPDATE users SET full_name = COALESCE($1, full_name), avatar = COALESCE($2, avatar) WHERE id = $3 RETURNING id, email, full_name, avatar',
      [fullName, avatar, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    logger.info(`Profile updated: ${userId}`);

    res.json({ success: true, message: 'Profile updated', data: result.rows[0] });
  } catch (error) {
    logger.error(`Update profile error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    res.json({ success: true, data: result.rows });
  } catch (error) {
    logger.error(`Get orders error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getUserPreferences = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await query(
      'SELECT preferences FROM user_preferences WHERE user_id = $1',
      [userId]
    );

    const preferences = result.rows.length > 0 ? result.rows[0].preferences : {};

    res.json({ success: true, data: preferences });
  } catch (error) {
    logger.error(`Get preferences error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const updateUserPreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    const preferences = req.body;

    await query(
      'INSERT INTO user_preferences (user_id, preferences) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET preferences = $2',
      [userId, JSON.stringify(preferences)]
    );

    logger.info(`Preferences updated: ${userId}`);

    res.json({ success: true, message: 'Preferences updated', data: preferences });
  } catch (error) {
    logger.error(`Update preferences error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
