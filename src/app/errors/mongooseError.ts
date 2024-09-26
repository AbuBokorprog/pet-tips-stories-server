import mongoose from 'mongoose';
import { TError, TGenericError } from '../interface/error.type';

export const mongooseValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericError => {
  const errorSource: TError[] = Object.values(err?.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value.path,
        message: value.message,
      };
    },
  );

  const statusCode = 400;

  return {
    statusCode: statusCode,
    message: 'Mongoose validation error',
    errorSource: errorSource,
  };
};
