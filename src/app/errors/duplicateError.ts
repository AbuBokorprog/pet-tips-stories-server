import { TError, TGenericError } from '../interface/error.type';

export const duplicateErrorHandle = (err: {
  message: string;
}): TGenericError => {
  const match = err.message.match(/"([^"]*)"/);

  const extractMessage = match && match[1];

  const errorSource: TError[] = [
    {
      path: '',
      message: `${extractMessage} is already exist!`,
    },
  ];

  const status = 400;

  return {
    statusCode: status,
    message: 'Duplicate error!',
    errorSource,
  };
};
