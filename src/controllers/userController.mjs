import UserService from '../services/user.service.js';

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  searchUser = async (req, res) => {
    const users = await this.userService.searchUser(req.body);
    res.send(users);
  };

  getUserById = async (req, res) => {
    const userId = req.params.id;
    const user = await this.userService.getUserById(userId);
    res.send(user);
  };
  
  createUser = async (req, res) => {
    const user = await this.userService.createUser(req.body);
    res.send(user);
  };
  
  updateUser = async (req, res) => {
    const user = await this.userService.updateUser(req.body);
    res.send(user);
  };
  
  deleteUser = async (req, res) => {
    const userId = req.params.id;
    const deleteResult = await this.userService.deleteUser(userId);
    res.send(deleteResult);
  };
}

export default UserController;