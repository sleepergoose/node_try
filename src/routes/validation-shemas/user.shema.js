import { checkSchema, validationResult } from 'express-validator';
import NodeError from '../../models/node-error.js';

const errorHandler = (req, res, next) => {
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

export const getUserByIdShemaValidator = [checkSchema({
  id: {
    in: ['params'],
    errorMessage: 'ID has incorrect format',
    isHexadecimal: true,
    isLength: {
      options: { min: 24, max: 24 },
    },
    trim: true,
  }
}), errorHandler];

export const updateUserShemaValidator = [checkSchema({
  _id: {
    errorMessage: 'ID has incorrect format',
    isHexadecimal: true,
    isLength: {
      options: { min: 24, max: 24 },
    },
    trim: true,
  },
  name: {
    errorMessage: 'Name value is invalid.',
    isEmpty: false,
    isLength: {
      options: { min: 3, max: 32 },
      errorMessage: 'Name must be between 3 and 32 characters long.',
    },
    trim: true,
    escape: true,
  },
  email: {
    errorMessage: 'Email value has incorrect format.',
    isEmpty: false,
    isEmail: true,
    trim: true,
  },
  role: {
    isIn: {
      options: [['admin', 'user']],
      errorMessage: 'Invalid role value',
    },
  },
}), errorHandler];