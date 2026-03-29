import express from 'express';
import {
  registerController,
  loginController,
  getUserProfileController,
  updateProfileController,
  createAddressController,
  getUserAddressController,
} from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);

router.get('/profile', authMiddleware, getUserProfileController);
router.patch('/profile', authMiddleware, updateProfileController);

router.post('/address', authMiddleware, createAddressController);
router.get('/address', authMiddleware, getUserAddressController);

export default router;
