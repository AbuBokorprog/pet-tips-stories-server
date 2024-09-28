import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import { userModel } from '../Modules/User/user.model';
import config from '../config';

export const Auth = (...roles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'The user are unauthorized!');
    }

    const decode = jwt.verify(
      token,
      config.access_secret as string,
    ) as JwtPayload;

    const { email, role } = decode;

    const isExistUser = await userModel.findOne({ email: email });

    if (!isExistUser) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
    }

    if (roles && !roles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are unauthorized user!');
    }

    req.user = decode as JwtPayload;

    next();
  });
};
