import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import UserController from '../controllers/user.controller.mjs';
import { getUserByIdShemaValidator, updateUserShemaValidator } from './validation-shemas/user.shema.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.get('/:id', authMiddleware, getUserByIdShemaValidator, userController.getUserById);
userRouter.put('/', authMiddleware, updateUserShemaValidator, userController.updateUser);
userRouter.delete('/:id', authMiddleware, getUserByIdShemaValidator, userController.deleteUser);

export default userRouter;