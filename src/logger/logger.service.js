/* eslint-disable no-console */
class Logger {
  constructor(filename) {
    this.filename = filename;
  }

  logger = (level, message) => {
    const log = {
      level: level,
      timestamp: Date().toJSON(),
      filename: this.filename,
      msg: message
    };

    switch (level) {
      case 'info':
        console.info(log);
        break;
      case 'error':
        console.error(log);
        break;
      case 'warn':
        console.warn(log);
        break;
      case 'debug':
        console.debug(log);
        break;
      case 'trace':
        console.trace(log);
        break;
      default:
        console.log(log);
        break;
    }
  };

  static pringLog = (message) => {
    const log = {
      level: 'info',
      timestamp: Date().toJSON(),
      filename: this.filename,
      msg: message
    };

    console.info(log);
  };
}

export default Logger;

