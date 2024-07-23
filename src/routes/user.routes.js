import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import UserController from '../controllers/user.controller.mjs';

const userRouter = express.Router();
const userController = new UserController();

userRouter.get('/:id', authMiddleware, userController.getUserById);
userRouter.put('/', authMiddleware, userController.updateUser);
userRouter.delete('/:id', authMiddleware, userController.deleteUser);

export default userRouter;