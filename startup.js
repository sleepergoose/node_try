import express from 'express';
import userRoutes from './src/routes/userRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import authRouter from './src/routes/authRoutes.js';
import APP_VARS from './src/constants/environment.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.listen(APP_VARS.APP_PORT, APP_VARS.APP_HOSTNAME, () => {
  console.log(`The server is running on the ${APP_VARS.APP_HOSTNAME}:${APP_VARS.APP_PORT}`);
});