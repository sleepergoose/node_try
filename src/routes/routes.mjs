import express from 'express';
import userController from '../controllers/userController.mjs';

const router = express.Router();

router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;