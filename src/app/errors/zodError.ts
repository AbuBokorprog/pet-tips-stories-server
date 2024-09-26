import { ZodError } from 'zod';
import { TError, TGenericError } from '../interface/error.type';

export const ZodErrorHandler = (err: ZodError): TGenericError => {
  const errorSource: TError[] = err.issues.map((issue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'Zod Validation Error',
    errorSource,
  };
};
