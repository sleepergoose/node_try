import jsonwebtoken from 'jsonwebtoken';
import APP_VARS from '../constants/environment.js';
import AuthService from '../services/auth.service.js';
import Context from '../models/context.js';

const authMiddleware = (req, res, next) => {
  const accessToken = req.header('Authorization')?.replace('Bearer ', '');
  const refreshToken = req.cookies['refreshToken'];

  if (!(accessToken || refreshToken)) {
    return res.status(401).json({ error: 'Access Denied. No token provided.' });
  }

  try {
    if (!accessToken) {
      res.status(401).json({ error: 'Access denied. No access token provided' });
    }

    const secretKey = APP_VARS.JWT_ACCESS_SECRET_KEY;

    const options = {
      expiresIn: APP_VARS.JWT_ACCESS_EXPIRES_IN,
      algorithm: APP_VARS.JWT_ALGORITHM,
      subject: APP_VARS.JWT_ISSUER,
      issuer: APP_VARS.JWT_AUDIENCE,
    };

    const decoded = jsonwebtoken.verify(accessToken, secretKey, options);
    req.userId = decoded.userId;

    const context = new Context(decoded.userId, decoded.userRole);

    req.locals = context;

    next();
  } catch {
    if (!refreshToken) {
      return res.status(401).json({ error: 'Access Denied. No refresh token provided.' });
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
      const newAccessToken = AuthService.generateAccessJwt({ _id: refreshDecoded.userId, role: refreshDecoded.userRole });

      res.setHeader('Authorization', newAccessToken);

      res
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 1, // secs * mins * hours * days
        })
        .send({ accessToken: newAccessToken });
    } catch {
      return res.status(401).json({ error: 'Access Denied. Refresh token is invalid.' });
    }
  }
};

export default authMiddleware;