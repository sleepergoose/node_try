import express from 'express';
import UserController from '../controllers/userController.mjs';

const userRouter = express.Router();
const userController = new UserController();

userRouter.get('/:id', userController.getUserById);
userRouter.post('/search', userController.searchUser);
userRouter.post('/', userController.createUser);
userRouter.put('/', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;