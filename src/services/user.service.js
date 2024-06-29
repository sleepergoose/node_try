import MongoClientService from './mongodb.service.js';

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
      throw new Error('User Service: User id cannot be null or undefined.');
    }

    return await this.mongoClientService.deleteDocumentById(this.collectionName, id);
  };

  getUserById = async (id) => {
    if (!id) {
      throw new Error('User Service: User id cannot be null or undefined.');
    }

    return await this.mongoClientService.getDocumentById(this.collectionName, id);
  };

  getUserByEmail = async (email) => {
    if (!email) {
      throw new Error('User Service: User email cannot be null or undefined.');
    }

    return await this.mongoClientService.getDocumentByEmail(this.collectionName, email);
  };

  searchUser = async (filter) => {
    if (!filter) {
      throw new Error('User Service: Filter cannot be null or undefined.');
    }

    return await this.mongoClientService.searchDocument(this.collectionName, filter);
  };
}

export default UserService;