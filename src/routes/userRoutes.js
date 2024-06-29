import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import UserController from '../controllers/userController.mjs';

const userRouter = express.Router();
const userController = new UserController();

userRouter.get('/:id', authMiddleware, userController.getUserById);
userRouter.post('/search', authMiddleware, userController.searchUser);
userRouter.post('/', authMiddleware, userController.createUser);
userRouter.put('/', authMiddleware, userController.updateUser);
userRouter.delete('/:id', authMiddleware, userController.deleteUser);

export default userRouter;