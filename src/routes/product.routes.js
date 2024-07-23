import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import ProductController from '../controllers/product.controller.js';
import {
  getPaginatedProductsSchemaValidator,
  getRecentProductsSchemaValidator,
  getProductByIdSchemaValidator,
  createProductSchemaValidator,
  updateProductSchemaValidator,
} from './validation-schemas/product.schema.js';

const productRoutes = express.Router();
const productController = new ProductController();

productRoutes.get('/paginated',
  authMiddleware,
  getPaginatedProductsSchemaValidator,
  productController.getPaginatedProducts
);

productRoutes.get('/types',
  authMiddleware,
  productController.getProductTypes
);

productRoutes.get('/filters',
  productController.getProductFilterData
);

productRoutes.get('/recent/:limit',
  authMiddleware,
  getRecentProductsSchemaValidator,
  productController.getRecentProducts
);

productRoutes.get('/:id',
  authMiddleware,
  getProductByIdSchemaValidator,
  productController.getProductById
);

productRoutes.post('/',
  authMiddleware,
  createProductSchemaValidator,
  productController.createProduct
);

productRoutes.put('/',
  authMiddleware,
  updateProductSchemaValidator,
  productController.updateProduct
);

productRoutes.delete('/:id',
  authMiddleware,
  getProductByIdSchemaValidator,
  productController.deleteProduct
);

export default productRoutes;