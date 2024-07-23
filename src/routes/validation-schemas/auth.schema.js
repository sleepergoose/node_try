import { checkSchema } from 'express-validator';
import { validationErrorHandler } from './error-handler.js';

export const authRegisterSchemaValidator = [
  checkSchema({
    name: {
      in: ['body'],
      errorMessage: 'User name is not correct',
      isEmpty: false,
      isString: true,
      isLength: {
        options: { min: 3, max: 32 },
        errorMessage: 'User name has incorrect length',
      },
      trim: true,
      escape: true,
    },
    email: {
      in: ['body'],
      errorMessage: 'User email value has incorrect format.',
      isString: true,
      isEmpty: false,
      isEmail: true,
      trim: true,
    },
    password: {
      in: ['body'],
      errorMessage: 'User password is not correct',
      isString: true,
      isEmpty: false,
      isLength: {
        options: { min: 8, max: 20 },
        errorMessage: 'User password has incorrect length',
      },
      trim: true,
      matches: {
        errorMessage: 'Password can include only letters, digits and symbols !@#$%^&*+-',
        options: /^[a-zA-Z0-9!@#$%^&*+-]{8,20}$/,
      }
    }
  }),
  validationErrorHandler
];

export const authLoginSchemaValidator = [
  checkSchema({
    email: {
      in: ['body'],
      errorMessage: 'User email value has incorrect format.',
      isString: true,
      isEmpty: false,
      isEmail: true,
      trim: true,
    },
    password: {
      in: ['body'],
      errorMessage: 'User password is not correct',
      isString: true,
      isEmpty: false,
      isLength: {
        options: { min: 8, max: 20 },
        errorMessage: 'User password has incorrect length',
      },
      trim: true,
      matches: {
        errorMessage: 'Password can include only letters, digits and symbols !@#$%^&*+-',
        options: /^[a-zA-Z0-9!@#$%^&*+-]{8,20}$/,
      }
    }
  }),
  validationErrorHandler
];

