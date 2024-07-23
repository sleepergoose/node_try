import { checkSchema } from 'express-validator';
import { errorHandler } from './error-handler.js';

export const getUserByIdSchemaValidator = [checkSchema({
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

export const updateUserSchemaValidator = [checkSchema({
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