import jsonwebtoken from 'jsonwebtoken';
import APP_VARS from '../constants/environment.js';
import AuthService from '../services/auth.service.js';
import Context from '../models/context.js';

const authMiddleware = (req, res, next) => {
  const accessToken = req.cookies['accessToken'];
  const refreshToken = req.cookies['refreshToken'];

  if (!(accessToken || refreshToken)) {
    res.status(401).json({ error: 'Access Denied. No token provided.' });
    return;
  }

  try {
    if (!accessToken) {
      throw new Error('Access denied. No access token provided');
    }

    const secretKey = APP_VARS.JWT_ACCESS_SECRET_KEY;

    const options = {
      expiresIn: APP_VARS.JWT_ACCESS_EXPIRES_IN,
      algorithm: APP_VARS.JWT_ALGORITHM,
      subject: APP_VARS.JWT_ISSUER,
      issuer: APP_VARS.JWT_AUDIENCE,
    };

    const decoded = jsonwebtoken.verify(accessToken, secretKey, options);

    req.locals = new Context(decoded.userId, decoded.userRole);

    next();
  } catch {
    if (!refreshToken) {
      res.status(401).json({ error: 'Access Denied. No refresh token provided.' });
      return;
    }

    try {
      const refreshSecretKey = APP_VARS.JWT_REFRESH_SECRET_KEY;

      const refreshOptions = {
        expiresIn: APP_VARS.JWT_REFRESH_EXPIRES_IN,
        algorithm: APP_VARS.JWT_ALGORITHM,
        subject: APP_VARS.JWT_ISSUER,
        issuer: APP_VARS.JWT_AUDIENCE,
      };

      const refreshDecoded = jsonwebtoken.verify(refreshToken, refreshSecretKey, refreshOptions);

      req.locals = new Context(refreshDecoded.userId, refreshDecoded.userRole);

      const newAccessToken = AuthService.generateAccessJwt({ _id: refreshDecoded.userId, role: refreshDecoded.userRole });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: APP_VARS.COOKIE_JWT_REFRESH_EXPIRES_IN, // ms
      });

      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: APP_VARS.COOKIE_JWT_ACCESS_EXPIRES_IN, // ms
      });

      next();
    } catch {
      res.status(401).json({ error: 'Access Denied. Session timed out, please, log out and log in again.' });
    }
  }
};

export default authMiddleware;