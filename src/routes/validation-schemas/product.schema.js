import { checkSchema } from 'express-validator';
import { validationErrorHandler } from './error-handler.js';
import { sanitizeUrl } from '@braintree/sanitize-url';
import lodash_pkg from 'lodash';
const { escape, isArray, isEmpty } = lodash_pkg;

export const getPaginatedProductsSchemaValidator = [
  checkSchema({
    page: {
      in: ['query'],
      isInt: {
        options: {
          min: 1,
        }
      },
    },
    limit: {
      in: ['query'],
      isInt: {
        options: {
          min: 1,
          max: 20,
        }
      },
    },
    sortOption: {
      in: ['query'],
      isIn: {
        options: [['priceUp', 'priceDown', 'alphabetically', 'newest']],
        errorMessage: 'Invalid sortOption value',
      },
    },
    type: {
      in: ['query'],
      optional: true,
      custom: {
        options: (value) => {
          if (isEmpty(value)) {
            return true;
          }

          return isArray(value) ? value.every(item => typeof item === 'string') : typeof value === 'string';
        },
        errorMessage: 'Each type item must be a string',
      },
      customSanitizer: {
        options: (value) => {
          if (isEmpty(value)) {
            return null;
          }

          return isArray(value) ? value.map(p => escape(p)) : escape(value);
        },
      },
    },
    manufacturer: {
      in: ['query'],
      optional: true,
      custom: {
        options: (value) => {
          if (isEmpty(value)) {
            return true;
          }

          return isArray(value) ? value.every(item => typeof item === 'string') : typeof value === 'string';
        },
        errorMessage: 'Each manufacturer must item must be a string',
      },
      customSanitizer: {
        options: (value) => {
          if (isEmpty(value)) {
            return true;
          }

          return isArray(value) ? value.map(p => escape(p)) : escape(value);
        },
      },
    }
  }),
  validationErrorHandler,
];

export const getRecentProductsSchemaValidator = [
  checkSchema({
    limit: {
      in: ['params'],
      isEmpty: false,
      isInt: {
        errorMessage: 'Limit value must be numeric',
        options: {
          min: 3,
          max: 10,
        }
      },
      errorMessage: 'Limit value is not provided',
    },
  }),
  validationErrorHandler,
];

export const getProductByIdSchemaValidator = [
  checkSchema({
    id: {
      in: ['params'],
      errorMessage: 'Product ID has incorrect format',
      isHexadecimal: true,
      isLength: {
        options: { min: 24, max: 24 },
      },
      trim: true,
    }
  }),
  validationErrorHandler
];

export const createProductSchemaValidator = [
  checkSchema({
    name: {
      in: ['body'],
      isString: true,
      isEmpty: false,
      errorMessage: 'Product name value is invalid.',
      isLength: {
        options: { min: 3, max: 128 },
        errorMessage: 'Product name must be 3 to 128 characters long.',
      },
      trim: true,
      escape: true,
    },
    price: {
      in: ['body'],
      isEmpty: false,
      isInt: {
        options: {
          min: 0,
          max: 1000000,
        },
        errorMessage: 'Product price must be more than 0 and less than 1000000 UAH.',
      },
      errorMessage: 'Product price value is invalid.',
    },
    manufacturer: {
      in: ['body'],
      isString: true,
      isEmpty: false,
      errorMessage: 'Product manufacturer value is invalid.',
      isLength: {
        options: { min: 3, max: 64 },
        errorMessage: 'Product manufacturer must be 3 to 64 characters long.',
      },
      trim: true,
      escape: true,
    },
    type: {
      in: ['body'],
      isString: true,
      isEmpty: false,
      errorMessage: 'Product type value is invalid.',
      isLength: {
        options: { min: 3, max: 64 },
        errorMessage: 'Product type must be 3 to 64 characters long.',
      },
      trim: true,
      escape: true,
    },
    photoUrl: {
      in: ['body'],
      optional: true,
      isURL: {
        options: {
          protocols: ['https'],
          require_protocol: true,
          require_valid_protocol: true,
          allow_trailing_dot: false,
          validate_length: true,
        }
      },
      customSanitizer: {
        options: (value) => sanitizeUrl(value),
      }
    },
    shortDescription: {
      in: ['body'],
      isString: true,
      isEmpty: false,
      errorMessage: 'Product short description value is invalid.',
      isLength: {
        options: { min: 10, max: 256 },
        errorMessage: 'Product short description must be 10 to 256 characters long.',
      },
      trim: true,
      escape: true,
    }
  }),
  validationErrorHandler,
];

export const updateProductSchemaValidator = [
  checkSchema({
    _id: {
      in: ['body'],
      errorMessage: 'Product ID has incorrect format',
      isHexadecimal: true,
      isLength: {
        options: { min: 24, max: 24 },
      },
      trim: true,
    },
    name: {
      in: ['body'],
      optional: true,
      isString: true,
      isEmpty: false,
      errorMessage: 'Product name value is invalid.',
      isLength: {
        options: { min: 3, max: 128 },
        errorMessage: 'Product name must be 3 to 128 characters long.',
      },
      trim: true,
      escape: true,
    },
    price: {
      in: ['body'],
      optional: true,
      isEmpty: false,
      isDecimal: {
        options: {
          decimal_digits: '0,4',
        },
        errorMessage: 'Product price exceeds the limit of decimal digits.',
      },
      isFloat: {
        options: {
          min: 0,
          max: 1000000,
        },
        errorMessage: 'Product price must be more than 0 and less than 1000000 UAH.',
      },
      errorMessage: 'Product price value is invalid.',
    },
    manufacturer: {
      in: ['body'],
      optional: true,
      isString: true,
      isEmpty: false,
      errorMessage: 'Product manufacturer value is invalid.',
      isLength: {
        options: { min: 3, max: 64 },
        errorMessage: 'Product manufacturer must be 3 to 64 characters long.',
      },
      trim: true,
      escape: true,
    },
    type: {
      in: ['body'],
      optional: true,
      isString: true,
      isEmpty: false,
      errorMessage: 'Product type value is invalid.',
      isLength: {
        options: { min: 3, max: 64 },
        errorMessage: 'Product type must be 3 to 64 characters long.',
      },
      trim: true,
      escape: true,
    },
    photoUrl: {
      in: ['body'],
      optional: true,
      isURL: {
        options: {
          protocols: ['https'],
          require_protocol: true,
          require_valid_protocol: true,
          allow_trailing_dot: false,
          validate_length: true,
        }
      },
      customSanitizer: {
        options: (value) => sanitizeUrl(value),
      }
    },
    shortDescription: {
      in: ['body'],
      optional: true,
      isString: true,
      isEmpty: false,
      errorMessage: 'Product short description value is invalid.',
      isLength: {
        options: { min: 10, max: 256 },
        errorMessage: 'Product short description must be 10 to 256 characters long.',
      },
      trim: true,
      escape: true,
    }
  }),
  validationErrorHandler,
];