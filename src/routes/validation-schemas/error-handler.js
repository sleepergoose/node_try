import { validationResult } from 'express-validator';
import NodeError from '../../models/node-error.js';

export const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const [{ value, msg, path, location }] = errors.array();

    throw new NodeError(400, {
      type: 'validation',
      endpoint: req.originalUrl,
      msg,
      value,
      path,
      location
    });
  }

  next();
};
