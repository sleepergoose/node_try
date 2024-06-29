import AuthService from '../services/auth.service.js';

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  registerUser = async (req, res, next) => {
    try {
      const response = await this.authService.registerUser(req.body);
      res.send(response);
    } catch (error) {
      next(error);
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const response = await this.authService.login(email, password);
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
};

export default AuthController;