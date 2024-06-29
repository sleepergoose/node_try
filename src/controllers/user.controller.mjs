import UserService from '../services/user.service.js';

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  searchUser = async (req, res, next) => {
    try {
      const users = await this.userService.searchUser(req.body);
      res.send(users);
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await this.userService.getUserById(userId);
      res.send(user);
    } catch (error) {
      next(error);
    }
  };
  
  createUser = async (req, res, next) => {
    try {
      const user = await this.userService.createUser(req.body);
      res.send(user);
    } catch (error) {
      next(error);
    }
  };
  
  updateUser = async (req, res, next) => {
    try {
      const user = await this.userService.updateUser(req.body);
      res.send(user);
    } catch (error) {
      next(error);
    }
  };
  
  deleteUser = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const deleteResult = await this.userService.deleteUser(userId);
      res.send(deleteResult);
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;