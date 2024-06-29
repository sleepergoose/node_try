import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import ProductController from '../controllers/product.controller.js';

const productRoutes = express.Router();
const productController = new ProductController();

productRoutes.get('/:id', authMiddleware, productController.getProductById);
productRoutes.post('/', authMiddleware, productController.createProduct);
productRoutes.put('/', authMiddleware, productController.updateProduct);
productRoutes.delete('/:id', authMiddleware, productController.deleteProduct);
productRoutes.post('/search', authMiddleware, productController.searchProducts);

export default productRoutes;