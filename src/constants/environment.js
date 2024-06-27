const APP_PORT = process.env.APP_PORT || 3000;
const APP_HOSTNAME = process.env.APP_HOSTNAME || 'localhost';
const DB_NAME = process.env.DB_NAME || 'NodeTryDb';
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING || 'mongodb://%3Cusername%3E:%3Cpassword%3E@localhost:27017/?authSource=admin&tls=false';

export default {
  APP_PORT,
  APP_HOSTNAME,
  MONGODB_CONNECTION_STRING,
  DB_NAME
};
