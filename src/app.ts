/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './app/route';
import { globalErrorHandler } from './app/middleware/globalError';
import { notFoundError } from './app/middleware/notFoundError';
// import { StudentRoutes } from './modules/students/student.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes

app.use(router);

app.get('/', (req: Request, res: Response) => {
  res.send('Project setup home page');
});

// global error
app.use(globalErrorHandler);

// notfound route handler
app.use(notFoundError);

export default app;
