import jsonwebtoken from 'jsonwebtoken';
import User from '../models/user.js';
import APP_VARS from '../constants/environment.js';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'Access denied' });
  }

  try {
    const secretKey = APP_VARS.JWT_SECRET_KEY;

    const options = {
      expiresIn: APP_VARS.JWT_EXPIRES_IN,
      algorithm: APP_VARS.JWT_ALGORITHM,
      subject: APP_VARS.JWT_ISSUER,
      issuer: APP_VARS.JWT_AUDIENCE,
    };

    const decoded = jsonwebtoken.verify(token, secretKey, options);
    req.userId = decoded.userId;

    User.setCurrentUser(decoded.userId, decoded.userRole);

    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default authMiddleware;