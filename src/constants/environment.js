const APP_PORT = process.env.APP_PORT || 5000;
const APP_HOSTNAME = process.env.APP_HOSTNAME || 'localhost';
const DB_NAME = process.env.DB_NAME || 'NodeTryDb';
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING || 'mongodb://%3Cusername%3E:%3Cpassword%3E@localhost:27017/?authSource=admin&tls=false';
const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN;
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN;
const JWT_ALGORITHM = process.env.JWT_ALGORITHM;
const JWT_ISSUER = process.env.JWT_ISSUER;
const JWT_AUDIENCE = process.env.JWT_AUDIENCE;
const JWT_ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY;
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;
const NODE_ENV = process.env.NODE_ENV;

export default {
  APP_PORT,
  APP_HOSTNAME,
  MONGODB_CONNECTION_STRING,
  DB_NAME,
  JWT_ACCESS_EXPIRES_IN,
  JWT_ALGORITHM,
  JWT_ISSUER,
  JWT_AUDIENCE,
  JWT_ACCESS_SECRET_KEY,
  JWT_REFRESH_EXPIRES_IN,
  JWT_REFRESH_SECRET_KEY,
  NODE_ENV
};
