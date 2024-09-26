/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import { ZodError } from 'zod';
import { ZodErrorHandler } from '../errors/zodError';
import { TError } from '../interface/error.type';
import config from '../config';
import mongoose from 'mongoose';
import { mongooseValidationError } from '../errors/mongooseError';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let status = 500;
  let message = err.message || 'Something went wrong!';
  let errorSource: TError[] = [];

  if (err instanceof ZodError) {
    const error = ZodErrorHandler(err);
    status = error.statusCode;
    message = error.message;
    errorSource = error.errorSource;
  } else if (err.name === 'validationError') {
    const simplifiedError = mongooseValidationError(err);

    status = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  }

  //   if (err instanceof AppError) {
  //     return res.status(err.statusCode).json({
  //       success: false,
  //       message: err.message,
  //       error: err.stack,
  //     });
  //   }

  //   return error
  return res.status(status).json({
    success: false,
    message: message,
    errorSource: errorSource,
    stack: config.node_env === 'development' ? err.stack : null,
  });
};
