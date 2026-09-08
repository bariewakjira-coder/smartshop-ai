import express from 'express';
import * as userController from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', authenticate, userController.getUserProfile);
router.put('/profile', authenticate, userController.updateUserProfile);
router.get('/orders', authenticate, userController.getUserOrders);
router.get('/preferences', authenticate, userController.getUserPreferences);
router.put('/preferences', authenticate, userController.updateUserPreferences);

export default router;
