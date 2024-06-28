import { MongoClient, ObjectId } from 'mongodb';
import environment from '../constants/environment.js';

class MongoClientService {
  constructor() {
    this.client = new MongoClient(environment.MONGODB_CONNECTION_STRING);
  }

  insertDocument = async (collectionName, document) => {
    if (!collectionName) {
      throw new Error('MongoDB: the callection name param cannot be null or empty.');
    }

    try {
      await this.client.connect();

      const result = await this.client.db(environment.DB_NAME).collection(collectionName).insertOne(document);
      this.client.close();

      return result.insertedId;
    } catch (error) {
      console.log(`ERROR, MONGO SERVICE: ${error?.message}`);
      this.client.close();
    }
  };

  updateDocument = async (collectionName, document) => {
    if (!(document?._id || document?.id)) {
      throw new Error('MongoDB: the specified document does not have an _id propery');
    }

    if (!collectionName) {
      throw new Error('MongoDB: the callection name param cannot be null or empty.');
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

      this.client.close();

      return result;
    } catch (error) {
      console.log(`ERROR, MONGO SERVICE: ${error?.message}`);
      this.client.close();
    }
  };

  getDocumentById = async (collectionName, id) => {
    if (!id) {
      throw new Error('MongoDB: the id param cannot be null or empty.');
    }

    if (!collectionName) {
      throw new Error('MongoDB: the callection name param cannot be null or empty.');
    }

    try {
      await this.client.connect();

      const filter = { _id: ObjectId.createFromHexString(id) };
      const result = await this.client.db(environment.DB_NAME).collection(collectionName).findOne(filter);

      this.client.close();

      return result;
    } catch (error) {
      console.log(`ERROR, MONGO SERVICE: ${error?.message}`);
      this.client.close();
    }
  };

  getDocumentByEmail = async (collectionName, email) => {
    if (!email) {
      throw new Error('MongoDB: the email param cannot be null or empty.');
    }

    if (!collectionName) {
      throw new Error('MongoDB: the callection name param cannot be null or empty.');
    }

    try {
      await this.client.connect();

      const filter = { email: email };
      const result = await this.client.db(environment.DB_NAME).collection(collectionName).findOne(filter);

      this.client.close();

      return result;
    } catch (error) {
      console.log(`ERROR, MONGO SERVICE: ${error?.message}`);
      this.client.close();
    }
  };

  deleteDocumentById = async (collectionName, id) => {
    if (!id) {
      throw new Error('MongoDB: the id param cannot be null or empty.');
    }

    if (!collectionName) {
      throw new Error('MongoDB: the callection name param cannot be null or empty.');
    }

    try {
      await this.client.connect();

      const filter = { _id: ObjectId.createFromHexString(id) };
      const result = await this.client.db(environment.DB_NAME).collection(collectionName).deleteOne(filter);

      this.client.close();

      return result;
    } catch (error) {
      console.log(`ERROR, MONGO SERVICE: ${error?.message}`);
      this.client.close();
    }
  };

  searchDocument = async (collectionName, filter, limit = 10) => {
    if (!filter) {
      throw new Error('MongoDB: the \'filter\' param cannot be null or undefined.');
    }

    if (!collectionName) {
      throw new Error('MongoDB: the callection name param cannot be null or empty.');
    }

    try {
      await this.client.connect();

      const result = await this.client
        .db(environment.DB_NAME)
        .collection(collectionName)
        .find(filter)
        .limit(limit < 100 ? limit : 100)
        .toArray();

      this.client.close();

      return result;
    } catch (error) {
      console.log(`ERROR, MONGO SERVICE: ${error?.message}`);
      this.client.close();
    }
  };
}

export default MongoClientService;