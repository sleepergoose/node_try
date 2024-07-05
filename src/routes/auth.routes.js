import express from 'express';
import AuthController from '../controllers/auth.controller.js';

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/register', authController.registerUser);
authRouter.post('/login', authController.loginUser);
authRouter.post('/refresh', authController.refreshToken);

export default authRouter;