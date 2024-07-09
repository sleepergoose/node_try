import ProductService from '../services/product.service.js';

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  getProductById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const product = await this.productService.getProductById(id);
      res.send(product);
    } catch (error) {
      next(error);
    }
  };

  getAllProducts = async (req, res, next) => {
    const limit = req.params.limit ?? 1000;

    try {
      const products = await this.productService.getAllProducts(limit);

      res.send(products);
    } catch (error) {
      next(error);
    }
  };

  getPaginatedProducts = async (req, res, next) => {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 20;

    try {
      const products = await this.productService.getPaginatedProducts(page, limit);

      res.send(products);
    } catch (error) {
      next(error);
    }
  };

  createProduct = async (req, res, next) => {
    try {
      const createdProduct = await this.productService.createProduct(req.body);
      res.send(createdProduct);
    } catch (error) {
      next(error);
    }
  };

  updateProduct = async (req, res, next) => {
    try {
      const updateProduct = await this.productService.updateProduct(req.body);
      res.send(updateProduct);
    } catch (error) {
      next(error);
    }
  };

  deleteProduct = async (req, res, next) => {
    try {
      const id = req.params.id;
      const deleteResult = await this.productService.deleteProduct(id);
      res.send(deleteResult);
    } catch (error) {
      next(error);
    }
  };

  searchProducts = async (req, res, next) => {
    try {
      const filter = req.body;
      const products = await this.productService.searchProducts(filter);
      res.send(products);
    } catch (error) {
      next(error);
    }
  };
};

export default ProductController;