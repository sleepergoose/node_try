import AuthService from '../services/auth.service.js';

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  registerUser = async (req, res) => {
    const response = await this.authService.registerUser(req.body);
    res.send(response);
  };

  loginUser = async (req, res) => {
    const { email, password } = req.body;
    const response = await this.authService.login(email, password);
    res.send(response);
  };
};

export default AuthController;