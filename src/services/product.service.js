import MongoClientService from './mongodb.service.js';
import Product from '../models/product.js';
import NodeError from '../models/node-error.js';
import { sortOptions } from '../constants/sortOptions.js';
import mongoSanitize from 'express-mongo-sanitize';
import lodash_pkg from 'lodash';
const { isEmpty, isArray } = lodash_pkg;

class ProductService {
  constructor() {
    this.collectionName = 'products';
    this.mongoClientService = new MongoClientService();
  }

  #defaultFilter = {
    $sort: {
      price: 1
    }
  };


  getProductById = async (id) => {
    if (!id) {
      throw new NodeError(400, 'Product Controller: product id cannot be null or undefined.');
    }

    const result = await this.mongoClientService.getDocumentById(this.collectionName, id);
    return result;
  };

  getAllProducts = async (limit) => {
    const result = await this.mongoClientService.getAllDocuments(this.collectionName, limit);

    return result;
  };

  getPaginatedProducts = async (page, limit, sortOption, type = null, manufacturer = null) => {
    const sanitizedType = mongoSanitize.sanitize(type);
    const sanitizedManufacturer = mongoSanitize.sanitize(manufacturer);

    const sort = sortOptions.find(p => p.value === sortOption)?.filter ?? this.#defaultFilter;

    const match = {};
    let countFilter = {};

    const _type = { $in: isArray(sanitizedType) ? sanitizedType : [sanitizedType] };
    const _manufacturer = { $in: isArray(sanitizedManufacturer) ? sanitizedManufacturer : [sanitizedManufacturer] };

    if (sanitizedType && sanitizedManufacturer) {
      match.$match = {
        $and: [
          { type: _type },
          { manufacturer: _manufacturer }
        ]
      };

      countFilter = {
        type: _type,
        manufacturer: _manufacturer
      };
    } else if (sanitizedType) {
      countFilter = { type: _type };
      match.$match = countFilter;
    } else if (sanitizedManufacturer) {
      countFilter = { manufacturer: _manufacturer };
      match.$match = countFilter;
    }

    const pipelines = isEmpty(match) ? [
      sort,
      {
        '$skip': (page - 1) * limit
      },
      {
        '$limit': limit
      },
    ] : [
      match,
      sort,
      {
        '$skip': (page - 1) * limit
      },
      {
        '$limit': limit
      },
    ];

    const isFiltered = !isEmpty(match);

    const result = await this.mongoClientService
      .getPaginatedDocuments(this.collectionName, pipelines, isFiltered, countFilter);

    return {
      count: result.countDocuments,
      products: result.documents,
    };
  };

  createProduct = async (product) => {
    const sanitizedProduct = mongoSanitize.sanitize(product);
    const { name, price, manufacturer, photoUrl } = sanitizedProduct;

    if (!(name && price && manufacturer)) {
      throw new NodeError(400, 'Product Controller: there are no required product\'s params.');
    }

    const objectId = await this.mongoClientService.insertDocument(this.collectionName, sanitizedProduct);

    return new Product(objectId, name, price, manufacturer, photoUrl);
  };

  updateProduct = async (product) => {
    const sanitizedProduct = mongoSanitize.sanitize(product);
    await this.mongoClientService.updateDocument(this.collectionName, sanitizedProduct);
    return sanitizedProduct;
  };

  deleteProduct = async (id) => {
    const sanitizedId = mongoSanitize.sanitize(id);

    if (!sanitizedId) {
      throw new NodeError(400, 'Product Service: User id cannot be null or undefined.');
    }

    return await this.mongoClientService.deleteDocumentById(this.collectionName, sanitizedId);
  };

  getRecentProducts = async (limit = 5) => {
    const filter = {};
    const sortBy = 'createdAt';
    const sortDirection = 'desc';

    return await this.mongoClientService.searchDocument(this.collectionName, filter, sortBy, sortDirection, limit);
  };

  getProductTypes = async () => {
    const typeObjects = await this.mongoClientService.getGroupedDocuments(this.collectionName, {
      $group: {
        _id: '$type'
      }
    });

    return typeObjects?.map(o => o._id);
  };

  getProductFilterData = async () => {
    const typeObjects = await this.mongoClientService.getGroupedDocuments(this.collectionName, {
      $group: {
        _id: '$type'
      }
    });

    const manufacturerObjects = await this.mongoClientService.getGroupedDocuments(this.collectionName, {
      $group: {
        _id: '$manufacturer'
      }
    });

    return {
      type: typeObjects?.map(o => o._id).sort(),
      manufacturer: manufacturerObjects?.map(o => o._id).sort(),
    };
  };
}

export default ProductService;