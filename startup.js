import express from 'express';
import userRoutes from './src/routes/user.routes.js';
import productRoutes from './src/routes/product.routes.js';
import authRouter from './src/routes/auth.routes.js';
import APP_VARS from './src/constants/environment.js';
import Logger from './src/logger/logger.service.js';
import errorHandler from './src/middleware/error.handler.js';
import requestLogMiddleware from './src/middleware/request-log.middleware.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';

const app = express();

const corsOptions = {
  origin: APP_VARS.ORIGIN_URL,
  optionsSuccessStatus: 200,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  credentials: true,
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: APP_VARS.RATE_LIMIT, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

app.use(limiter);
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogMiddleware);

app.use('/auth', authRouter);
app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.use(errorHandler);

app.listen(APP_VARS.APP_PORT, APP_VARS.APP_HOSTNAME, () => {
  Logger.pringLog(`The server is running on the ${APP_VARS.APP_HOSTNAME}:${APP_VARS.APP_PORT}`);
});