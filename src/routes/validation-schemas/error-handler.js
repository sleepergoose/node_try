import { validationResult } from 'express-validator';
import NodeError from '../../models/node-error.js';

export const errorHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new NodeError(400, [{
      type: 'validation',
      method: 'getUserById',
      endpoint: '/users/:id',
    }, ...errors.array()]);
  }

  next();
};
