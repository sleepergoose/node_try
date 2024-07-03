import Logger from '../logger/logger.service.js';

const requestLogMiddleware = (req, res, next) => {
  const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  Logger.pringLog(`Received a '${req.method}' request at '${new Date().toISOString()}' from '${url}'`);
  next();
};

export default requestLogMiddleware;