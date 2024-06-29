import jsonwebtoken from 'jsonwebtoken';
import User from '../models/user.js';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'Access denied' });
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY;

    const options = {
      expiresIn: process.env.JWT_EXPIRES_IN,
      algorithm: process.env.JWT_ALGORITHM,
      subject: process.env.JWT_ISSUER,
      issuer: process.env.JWT_AUDIENCE,
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