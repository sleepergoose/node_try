import { sortOptions } from '../constants/sortOptions.js';
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
    await new Promise(resolve => setTimeout(resolve, 300)); // an artificial delay just to imitate real life

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const sortOption = sortOptions
      .map(p => p.value)
      .includes(req.query.sortOption) ? req.query.sortOption : 'priceUp';

    const type = req.query.type ?? null;
    const manufacturer = req.query.manufacturer ?? null;

    try {
      const products = await this.productService.getPaginatedProducts(page, limit, sortOption, type, manufacturer);
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

  getRecentProducts = async (req, res, next) => {
    try {
      const limit = Number(req.params.limit) || 5;
      const products = await this.productService.getRecentProducts(limit > 10 ? 10 : 5);
      res.send(products);
    } catch (error) {
      next(error);
    }
  };

  getProductTypes = async (req, res, next) => {
    try {
      const productTypes = await this.productService.getProductTypes();
      res.send(productTypes);
    } catch (error) {
      next(error);
    }
  };

  getProductFilterData = async (req, res, next) => {
    try {
      const filterData = await this.productService.getProductFilterData();
      res.send(filterData);
    } catch (error) {
      next(error);
    }
  };
};

export default ProductController;