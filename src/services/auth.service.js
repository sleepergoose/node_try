import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import UserService from './user.service.js';
import Roles from '../models/roles.js';

class AuthService {
  constructor() {
    this.userService = new UserService();
    this.saltRounds = process.env.SALT_ROUNDS || 50;
    console.log(this.saltRounds);
  }

  registerUser = async (user) => {
    const { email, password, name } = user;

    const role = user.role ?? Roles.USER;

    if (!(email && name && name.length > 3 && password)) {
      throw new Error(`AuthService: Invalid credentials provided.`);
    }

    if (password.length < 8 || password.length > 20) {
      throw new Error(`AuthService: Password must 8-20 characters long.`);
    }

    const hash = await this.#hashPassword(password);

    const user = await this.userService.createUser({ email, name, hash, role });

    const token = this.#generateJwt(user);
    console.log(token);

    return {
      success: true,
      token: token,
    };;
  };

  login = async (email, password) => {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new Error(`AuthService: there is no user with email '${email}'`);
    }

    if (!this.#verifyPassword(password, user.hash)) {
      return {
        success: false,
        token: null,
      };
    }

    const token = this.#generateJwt(user);

    return   {
      success: true,
      token: token,
    };
  };

  #generateJwt = (user) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    console.log(jwtSecretKey)

    if (!jwtSecretKey) {
      throw new Error("AuthService: No data to generate token");
    }

    const data = {
      time: Date(),
      userId: user._id,
    };

    const token = jsonwebtoken.sign(data, jwtSecretKey, {
      expiresIn: '1h',
      algorithm: 'HS256',
      subject: 'Node Try',
      issuer: 'Node Try',
    });

    return token;
  };

  #hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(this.saltRounds);
    console.log(salt);
    const hash = await bcrypt.hash(password, salt);
    console.log(hash);
    return hash;
  };

  #verifyPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
  };
}


export default AuthService;