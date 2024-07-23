import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import UserController from '../controllers/user.controller.mjs';
import { getUserByIdSchemaValidator, updateUserSchemaValidator } from './validation-schemas/user.schema.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.get('/:id', authMiddleware, getUserByIdSchemaValidator, userController.getUserById);
userRouter.put('/', authMiddleware, updateUserSchemaValidator, userController.updateUser);
userRouter.delete('/:id', authMiddleware, getUserByIdSchemaValidator, userController.deleteUser);

export default userRouter;