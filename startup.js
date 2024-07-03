import express from 'express';
import userRoutes from './src/routes/user.routes.js';
import productRoutes from './src/routes/product.routes.js';
import authRouter from './src/routes/auth.routes.js';
import APP_VARS from './src/constants/environment.js';
import Logger from './src/logger/logger.service.js';
import errorHandler from './src/middleware/error.handler.js';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  methods: ['GET', 'PUT', 'POST', 'DELETE']
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/auth', authRouter);
app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.use(errorHandler);

app.listen(APP_VARS.APP_PORT, APP_VARS.APP_HOSTNAME, () => {
  Logger.pringLog(`The server is running on the ${APP_VARS.APP_HOSTNAME}:${APP_VARS.APP_PORT}`);
});