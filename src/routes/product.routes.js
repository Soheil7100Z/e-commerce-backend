import express from 'express';
import { getHomeDataController } from '../controllers/product.controller.js';
const router = express.Router();

router.get('/' , getHomeDataController)

export default router;

