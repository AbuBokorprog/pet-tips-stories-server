/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/route';
import { globalErrorHandler } from './app/middleware/globalError';
import { notFoundError } from './app/middleware/notFoundError';
const app: Application = express();
import cookieParser from 'cookie-parser';

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [''],
    credentials: true,
  }),
);

// application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Project setup home page');
});

// global error
app.use(globalErrorHandler);

// notfound route handler
app.use(notFoundError);

export default app;
