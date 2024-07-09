import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import UserService from './user.service.js';
import Roles from '../models/roles.js';
import NodeError from '../models/node-error.js';
import APP_VARS from '../constants/environment.js';

class AuthService {
  constructor() {
    this.userService = new UserService();
  }

  registerUser = async (user) => {
    const { email, password, name } = user;

    const role = user.role ?? Roles.USER;

    if (!(email && name && name.length > 3 && password)) {
      throw new NodeError(400, 'Invalid credentials provided.');
    }

    if (password.length < 8 || password.length > 20) {
      throw new NodeError(400, 'Password must 8-20 characters long.');
    }

    const userWithEmail = await this.userService.getUserByEmail(email);

    if (userWithEmail) {
      throw new NodeError(400, 'User with such an email already exists');
    }

    const hash = this.#hashPassword(password);

    const createdUser = await this.userService.createUser({ email, name, hash, role });

    const accessToken = AuthService.generateAccessJwt(createdUser);
    const refreshToken = this.#generateRefreshJwt(createdUser);

    return {
      success: true,
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: createdUser,
    };
  };

  login = async (email, password) => {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new NodeError(400, `There is no user with email '${email}'`);
    }

    if (!this.#verifyPassword(password, user.hash)) {
      return {
        success: false,
        token: null,
      };
    }

    const accessToken = AuthService.generateAccessJwt(user);
    const refreshToken = this.#generateRefreshJwt(user);

    delete user.hash;

    return {
      success: true,
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: user,
    };
  };

  refreshAccessToken = async (refreshToken) => {
    const secretKey = APP_VARS.JWT_REFRESH_SECRET_KEY;

    const options = {
      expiresIn: APP_VARS.JWT_REFRESH_EXPIRES_IN,
      algorithm: APP_VARS.JWT_ALGORITHM,
      subject: APP_VARS.JWT_ISSUER,
      issuer: APP_VARS.JWT_AUDIENCE,
    };

    try {
      const decoded = jsonwebtoken.verify(refreshToken, secretKey, options);
      const accessToken = AuthService.generateAccessJwt({ _id: decoded.userId, role: decoded.userRole });

      return { accessToken };
    } catch {
      throw new NodeError(401, 'Invalid refresh token.');
    }
  };

  static generateAccessJwt = (user) => {
    const jwtSecretKey = APP_VARS.JWT_ACCESS_SECRET_KEY;

    const options = {
      expiresIn: APP_VARS.JWT_ACCESS_EXPIRES_IN,
      algorithm: APP_VARS.JWT_ALGORITHM,
      subject: APP_VARS.JWT_ISSUER,
      issuer: APP_VARS.JWT_AUDIENCE,
    };

    if (!jwtSecretKey) {
      throw new NodeError(500, 'No data to generate token');
    }

    const claims = {
      time: Date(),
      userRole: user.role,
      userId: user._id,
    };

    const token = jsonwebtoken.sign(claims, jwtSecretKey, options);

    return token;
  };

  #generateRefreshJwt = (user) => {
    const jwtSecretKey = APP_VARS.JWT_REFRESH_SECRET_KEY;

    const options = {
      expiresIn: APP_VARS.JWT_REFRESH_EXPIRES_IN,
      algorithm: APP_VARS.JWT_ALGORITHM,
      subject: APP_VARS.JWT_ISSUER,
      issuer: APP_VARS.JWT_AUDIENCE,
    };

    if (!jwtSecretKey) {
      throw new NodeError(500, 'No data to generate token');
    }

    const claims = {
      time: Date(),
      userRole: user.role,
      userId: user._id,
    };

    const token = jsonwebtoken.sign(claims, jwtSecretKey, options);

    return token;
  };

  #hashPassword = (password) => {
    return bcrypt.hashSync(password, 13);
  };

  #verifyPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
  };
}

export default AuthService;