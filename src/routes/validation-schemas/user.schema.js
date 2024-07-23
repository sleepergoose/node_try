import { checkSchema } from 'express-validator';
import { validationErrorHandler } from './error-handler.js';

export const getUserByIdSchemaValidator = [
  checkSchema({
    id: {
      in: ['params'],
      errorMessage: 'User ID has incorrect format',
      isHexadecimal: true,
      isLength: {
        options: { min: 24, max: 24 },
      },
      trim: true,
    }
  }),
  validationErrorHandler
];

export const updateUserSchemaValidator = [
  checkSchema({
    _id: {
      errorMessage: 'User ID has incorrect format',
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
        errorMessage: 'User name must be between 3 and 32 characters long.',
      },
      trim: true,
      escape: true,
    },
    email: {
      errorMessage: 'User email value has incorrect format.',
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
  }),
  validationErrorHandler
];