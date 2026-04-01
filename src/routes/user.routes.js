import express from 'express';
import {
  registerController,
  loginController,
  getUserProfileController,
  updateProfileController,
  getUserAddressController,
  upsertAddressController,
} from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);

router.get('/profile', authMiddleware, getUserProfileController);
router.patch('/profile', authMiddleware, updateProfileController);

router.patch('/address', authMiddleware, upsertAddressController);
router.get('/address', authMiddleware, getUserAddressController);

export default router;
