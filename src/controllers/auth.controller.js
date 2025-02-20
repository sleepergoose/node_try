import NodeError from '../models/node-error.js';
import AuthService from '../services/auth.service.js';
import APP_VARS from '../constants/environment.js';

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  registerUser = async (req, res, next) => {
    try {
      const response = await this.authService.registerUser(req.body);

      res
        .cookie('accessToken', response.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: APP_VARS.COOKIE_JWT_ACCESS_EXPIRES_IN,
          path: '/',
        })
        .cookie('refreshToken', response.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: APP_VARS.COOKIE_JWT_REFRESH_EXPIRES_IN,
          path: '/',
        })
        .status(200).json({
          success: true,
          user: response.user,
        });
    } catch (error) {
      next(error);
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const response = await this.authService.login(email, password);

      res
        .cookie('accessToken', response.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: APP_VARS.COOKIE_JWT_ACCESS_EXPIRES_IN, // in ms
          path: '/',
        })
        .cookie('refreshToken', response.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: APP_VARS.COOKIE_JWT_REFRESH_EXPIRES_IN, // in ms
          path: '/',
        })
        .status(200).json({
          success: true,
          user: response.user,
        });
    } catch (error) {
      next(error);
    }
  };

  logOut = (req, res, next) => {
    res.clearCookie('refreshToken', { httpOnly: true });
    res.clearCookie('accessToken', { httpOnly: true });
    res.status(200).json({
      message: 'Logged out successfully'
    });
  };

  refreshToken = async (req, res, next) => {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) {
      throw new NodeError(401, 'Access Denied. No refresh token provided.');
    }

    try {
      const response = await this.authService.refreshAccessToken(refreshToken);

      res.status(200).json({
        success: true,
        accessToken: response.accessToken,
      });
    } catch (error) {
      next(error);
    }
  };
};

export default AuthController;