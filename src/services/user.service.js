import MongoClientService from './mongodb.service.js';
import NodeError from '../models/node-error.js';

class UserService {
  constructor() {
    this.collectionName = 'users';
    this.mongoClientService = new MongoClientService();
  }

  createUser = async (user) => {
    const objectId = await this.mongoClientService.insertDocument(this.collectionName, user);
    return { objectId, ...user };
  };

  updateUser = async (user) => {
    await this.mongoClientService.updateDocument(this.collectionName, user);
    return user;
  };

  deleteUser = async (id) => {
    if (!id) {
      throw new NodeError(400, 'User Service: User id cannot be null or undefined.');
    }

    return await this.mongoClientService.deleteDocumentById(this.collectionName, id);
  };

  getUserById = async (id) => {
    if (!id) {
      throw new NodeError(400, 'User Service: User id cannot be null or undefined.');
    }

    const user = await this.mongoClientService.getDocumentById(this.collectionName, id);
    delete user.hash;

    return user;
  };

  getUserByEmail = async (email) => {
    if (!email) {
      throw new NodeError(400, 'User Service: User email cannot be null or undefined.');
    }

    return await this.mongoClientService.getDocumentByEmail(this.collectionName, email);
  };

  searchUser = async (filter) => {
    if (!filter) {
      throw new NodeError(400, 'User Service: Filter cannot be null or undefined.');
    }

    const users = await this.mongoClientService.searchDocument(this.collectionName, filter);

    users.forEach(user => {
      delete user.hash;
    });

    return users;
  };
}

export default UserService;