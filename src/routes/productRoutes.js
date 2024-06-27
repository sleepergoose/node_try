import express from 'express';
import ProductController from '../controllers/productController.js';

const productRoutes = express.Router();
const productController = new ProductController();

productRoutes.get('/:id', productController.getProductById);
productRoutes.post('/', productController.createProduct);
productRoutes.put('/', productController.updateProduct);
productRoutes.delete('/:id', productController.deleteProduct);
productRoutes.post('/search', productController.searchProducts);

export default productRoutes;