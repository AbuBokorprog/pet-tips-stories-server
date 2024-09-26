export type TError = {
  path: string | number;
  message: string;
};

export type TGenericError = {
  statusCode: number;
  message: string;
  errorSource: TError[];
};
