import express from 'express';
import routes from './src/routes/routes.mjs';
import APP_VARS from './src/constants/environment.js';

const app = express();

app.use(express.json());
app.use('/users', routes);

app.listen(APP_VARS.APP_PORT, APP_VARS.APP_HOSTNAME, () => {
  console.log(`The server is running on the ${APP_VARS.APP_HOSTNAME}:${APP_VARS.APP_PORT}`);
});