import express from 'express';
import { registerController, loginController, profileController } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/profile', authMiddleware, profileController);

export default router;
