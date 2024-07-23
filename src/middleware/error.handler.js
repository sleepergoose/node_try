import NodeError from '../models/node-error.js';
import Logger from '../logger/logger.service.js';

const errorHandler = (err, req, res, next) => {
  Logger.pringGlobalLog(err);

  if (err instanceof NodeError) {
    res.status(err.statusCode).json({ message: 'Bad Request' });
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default errorHandler;