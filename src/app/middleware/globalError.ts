/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import mongoose, { mongo } from 'mongoose';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = 500;
  const message = err.message || 'Something went wrong!';

  console.log(err);

  //   if (err instanceof AppError) {
  //     return res.status(err.statusCode).json({
  //       success: false,
  //       message: err.message,
  //       error: err.stack,
  //     });
  //   }

  return res.status(status).json({
    success: false,
    message: message,
    error: err,
  });
};
