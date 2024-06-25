import MongoClientService from './mongodb.service.js';
import User from '../models/user.mjs';

class UserService {
  constructor() {
    this.collectionName = 'users';
    this.mongoClientService = new MongoClientService();
  }

  createUser = async (user) => {
    const { name, age, role } = user;
    const id = await this.mongoClientService.insertDocument(this.collectionName, { name, age, role });
    return new User(id, name, age, role);
  };

  updateUser = async (user) => {
    const { name, age, role } = user;
    const id = await this.mongoClientService.updateDocument(this.collectionName, { name, age, role });
    return new User(id, name, age, role);

  };

  deleteUser = async (user) => {
    const id = user?.id || user?._id;

    if (!id) {
      throw new Error('User Service: User id cannot be null or undefined.');
    }

    return await this.mongoClientService.deleteDocumentById(this.collectionName, id);
  };

  getUserById = async (userId) => {
    if (!userId) {
      throw new Error('User Service: User id cannot be null or undefined.');
    }

    return await this.mongoClientService.getUserById(this.collectionName, id);
  };

  searchUser = async (filter) => {
    if (!filter) {
      throw new Error('User Service: Filter cannot be null or undefined.');
    }

    return await this.mongoClientService.searchDocument(this.collectionName, filter);
  };
}

export default UserService;