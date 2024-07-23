import express from 'express';
import AuthController from '../controllers/auth.controller.js';
import { authRegisterSchemaValidator, authLoginSchemaValidator } from './validation-schemas/auth.schema.js';

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/register', authRegisterSchemaValidator, authController.registerUser);
authRouter.post('/login', authLoginSchemaValidator, authController.loginUser);
authRouter.post('/refresh', authController.refreshToken);
authRouter.post('/logout', authController.logOut);

export default authRouter;