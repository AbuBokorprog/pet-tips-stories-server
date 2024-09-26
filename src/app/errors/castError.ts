import mongoose from 'mongoose';
import { TError, TGenericError } from '../interface/error.type';

export const CastErrorHandle = (
  err: mongoose.Error.CastError,
): TGenericError => {
  const errorSource: TError[] = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const status = 400;

  return {
    statusCode: status,
    message: 'Mongoose cast Error',
    errorSource: errorSource,
  };
};
