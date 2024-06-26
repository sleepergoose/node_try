import ProductService from '../services/product.service.js';

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  getProductById = async(req, res) => {
    const id = req.params.id;
    const product = await this.productService.getProductById(id);
    res.send(product);
  };

  createProduct = async (req, res) => {
    const createdProduct = await this.productService.createProduct(req.body);
    res.send(createdProduct); 
  };

  updateProduct = async (req, res) => {
    const updateProduct = await this.productService.updateProduct(req.body);
    res.send(updateProduct); 
  };

  deleteProduct = async (req, res) => {
    const id = req.params.id;
    const deleteResult = await this.productService.deleteProduct(id);
    res.send(deleteResult); 
  };

  searchProducts = async(req, res) => {
    const filter = req.body;
    const products = await this.productService.searchProducts(filter);
    res.send(products);
  };
};

export default ProductController;