import { MongoClient, ObjectId } from 'mongodb';
import environment from '../constants/environment.js';
import Logger from '../logger/logger.service.js';
import NodeError from '../models/node-error.js';

class MongoClientService {
  constructor() {
    this.client = new MongoClient(environment.MONGODB_CONNECTION_STRING);
    this.logger = new Logger('mongodb.service');
  }

  insertDocument = async (collectionName, document) => {
    if (!collectionName) {
      throw new NodeError(400, 'MongoDB: the callection name param cannot be null or empty.');
    }

    try {
      await this.client.connect();
      const result = await this.client.db(environment.DB_NAME).collection(collectionName).insertOne(document);

      await this.client.close();

      return result.insertedId;
    } catch (error) {
      this.logger.log('error', error?.message);
      this.client.close();
    }
  };

  updateDocument = async (collectionName, document) => {
    if (!(document?._id || document?.id)) {
      throw new NodeError(400, 'MongoDB: the specified document does not have an _id propery');
    }

    if (!collectionName) {
      throw new NodeError(500, 'MongoDB: the callection name param cannot be null or empty.');
    }

    try {
      await this.client.connect();
  
      const filter = { _id: ObjectId.createFromHexString(document._id) ?? ObjectId.createFromHexString(document.id) };
      
      let documentWithoutId;

      if (document?._id) {
        const { _id, ...rest } = document; // eslint-disable-line no-unused-vars
        documentWithoutId = rest;
      } else {
        const { id, ...rest } = document; // eslint-disable-line no-unused-vars
        documentWithoutId = rest;
      }

      const newValues = { 
        $set: {
          ...documentWithoutId,
        }
      };

      const result = await this.client.db(environment.DB_NAME).collection(collectionName).updateOne(filter, newValues);

      await this.client.close();

      return result;
    } catch (error) {
      this.logger.log('error', error?.message);
      this.client.close();
    }
  };

  getDocumentById = async (collectionName, id) => {
    if (!id) {
      throw new NodeError(400, 'MongoDB: the id param cannot be null or empty.');
    }

    if (!collectionName) {
      throw new NodeError(500, 'MongoDB: the callection name param cannot be null or empty.');
    }

    try {
      await this.client.connect();

      const filter = { _id: ObjectId.createFromHexString(id) };
      const result = await this.client.db(environment.DB_NAME).collection(collectionName).findOne(filter);

      await this.client.close();

      return result;
    } catch (error) {
      this.logger.log('error', error?.message);
      this.client.close();
    }
  };

  getDocumentByEmail = async (collectionName, email) => {
    if (!email) {
      throw new NodeError(400, 'MongoDB: the email param cannot be null or empty.');
    }

    if (!collectionName) {
      throw new NodeError(500, 'MongoDB: the callection name param cannot be null or empty.');
    }

    try {
      await this.client.connect();

      const filter = { email: email };
      const result = await this.client.db(environment.DB_NAME).collection(collectionName).findOne(filter);

      await this.client.close();

      return result;
    } catch (error) {
      this.logger.log('error', error?.message);
      this.client.close();
    }
  };

  deleteDocumentById = async (collectionName, id) => {
    if (!id) {
      throw new NodeError(400, 'MongoDB: the id param cannot be null or empty.');
    }

    if (!collectionName) {
      throw new NodeError(500, 'MongoDB: the callection name param cannot be null or empty.');
    }

    try {
      await this.client.connect();

      const filter = { _id: ObjectId.createFromHexString(id) };
      const result = await this.client.db(environment.DB_NAME).collection(collectionName).deleteOne(filter);

      await this.client.close();

      return result;
    } catch (error) {
      this.logger.log('error', error?.message);
      this.client.close();
    }
  };

  searchDocument = async (collectionName, filter, limit = 10) => {
    if (!filter) {
      throw new NodeError(400, 'MongoDB: the \'filter\' param cannot be null or undefined.');
    }

    if (!collectionName) {
      throw new NodeError(500, 'MongoDB: the callection name param cannot be null or empty.');
    }

    try {
      await this.client.connect();

      const result = await this.client
        .db(environment.DB_NAME)
        .collection(collectionName)
        .find(filter)
        .limit(limit < 100 ? limit : 100)
        .toArray();

      await this.client.close();

      return result;
    } catch (error) {
      this.logger.log('error', error?.message);
      this.client.close();
    }
  };
}

export default MongoClientService;