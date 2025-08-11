// routes/userRoutes.js
import express from 'express';
const router = express.Router();
import authController from '../Controller/authController.js';
import middleware from '../middleware/authMiddleware.js';
router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/send-code', authController.sendVerificationCode);
router.post('/verify-code', authController.verifyCode);
export default router

