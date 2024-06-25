import { MongoClient } from 'mongodb';
import { DB_NAME, MONGODB_CONNECTION_STRING } from './src/constants/environment.mjs';

const client = new MongoClient(MONGODB_CONNECTION_STRING);

const insertDocument = async (collectionName, document) => {
  if (!collectionName) {
    throw new Error('MongoDB: the callection name param cannot be null or empty.');
  }

  try {
    await client.connect();

    const result = await client.db(DB_NAME).collection(collectionName).insertOne(document);
    client.close();

    return result.insertedId;
  } catch (error) {
    console.log(err?.message);
    client.close();
  }
};

const updateDocument = async (collectionName, document) => {
  if (!(document?._id || document?.id)) {
    throw new Error('MongoDB: the specified document does not have an _id propery');
  }

  if (!collectionName) {
    throw new Error('MongoDB: the callection name param cannot be null or empty.');
  }

  try {
    await client.connect();
 
    const filter = { _id: document._id ?? document.id};
    
    let documentWithoutId;

    if (document?._id) {
      const { _id, ...rest } = document;
      documentWithoutId = rest;
    } else {
      const { id, ...rest } = document;
      documentWithoutId = rest;
    }

    const newValues = { 
      $set: {
        ...documentWithoutId,
      }
    };

    const result = await client.db(DB_NAME).collection(collectionName).updateOne(filter, newValues);

    client.close();

    return result;
  } catch (error) {
    console.log(err?.message);
    client.close();
  }
};

const getDocumentById = async (collectionName, id) => {
  if (!id) {
    throw new Error('MongoDB: the id param cannot be null or empty.');
  }

  if (!collectionName) {
    throw new Error('MongoDB: the callection name param cannot be null or empty.');
  }

  try {
    await client.connect();

    const filter = { _id: id };
    const result = await client.db(DB_NAME).collection(collectionName).findOne(filter);

    client.close();

    return result;
  } catch (error) {
    console.log(err?.message);
    client.close();
  }
};

const deleteDocumentById = async (collectionName, id) => {
  if (!id) {
    throw new Error('MongoDB: the id param cannot be null or empty.');
  }

  if (!collectionName) {
    throw new Error('MongoDB: the callection name param cannot be null or empty.');
  }

  try {
    await client.connect();

    const filter = { _id: id };
    const result = await client.db(DB_NAME).collection(collectionName).deleteOne(filter);

    client.close();

    return result;
  } catch (error) {
    console.log(err?.message);
    client.close();
  }
};

const searchDocument = async (collectionName, filter, limit = 10) => {
  if (!filter) {
    throw new Error('MongoDB: the \'filter\' param cannot be null or undefined.');
  }

  if (!collectionName) {
    throw new Error('MongoDB: the callection name param cannot be null or empty.');
  }

  try {
    await client.connect();

    const result = await client
      .db(DB_NAME)
      .collection(collectionName)
      .find(filter)
      .limit(limit < 100 ? limit : 100)
      .toArray();

    client.close();

    return result;
  } catch (error) {
    console.log(err?.message);
    client.close();
  }
};

export default {
  getDocumentById,
  insertDocument,
  updateDocument,
  deleteDocumentById,
  searchDocument,
};