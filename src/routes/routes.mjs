import express from 'express';
import UserController from '../controllers/userController.mjs';

const router = express.Router();
const userController = new UserController();


router.get('/:id', userController.getUserById);
router.post('/search', userController.searchUser);
router.post('/', userController.createUser);
router.put('/', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;