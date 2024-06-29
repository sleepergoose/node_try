import MongoClientService from './mongodb.service.js';
import Product from '../models/product.js';
import NodeError from '../models/NodeError.js';

class ProductService {
  constructor() {
    this.collectionName = 'products';
    this.mongoClientService = new MongoClientService();
  }

  getProductById = async(id) => {
    if (!id) {
      throw new NodeError(400, 'Product Controller: product id cannot be null or undefined.');
    }

    const result = await this.mongoClientService.getDocumentById(this.collectionName, id);

    return result;
  };

  createProduct = async (product) => {
    const { name, price, manufacturer, photoUrl } = product;

    if (!(name && price && manufacturer)) {
      throw new NodeError(400, 'Product Controller: there are no required product\'s params.');
    }

    const objectId = await this.mongoClientService.insertDocument(this.collectionName, product);

    return new Product(objectId, name, price, manufacturer, photoUrl);
  };

  updateProduct = async (product) => {
    await this.mongoClientService.updateDocument(this.collectionName, product);
    return product;
  };

  deleteProduct = async (id) => {
    if (!id) {
      throw new NodeError(400, 'Product Service: User id cannot be null or undefined.');
    }

    return await this.mongoClientService.deleteDocumentById(this.collectionName, id);
  };

  searchProducts = async (filter) => {
    if (!filter) {
      throw new NodeError(400, 'Product Service: Filter cannot be null or undefined.');
    }

    return await this.mongoClientService.searchDocument(this.collectionName, filter);
  };
}

export default ProductService;