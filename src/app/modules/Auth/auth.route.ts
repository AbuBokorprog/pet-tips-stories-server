import express from 'express';
import { createUserValidation } from '../User/user.validation';
import { authControllers } from './auth.controller';
import { validationRequest } from '../../utils/validationRequest';
import { loginValidationSchema } from './auth.validation';
const route = express.Router();

route.post(
  '/auth/register',
  validationRequest(createUserValidation),
  authControllers.createUser,
);

route.post(
  '/auth/login',
  validationRequest(loginValidationSchema),
  authControllers.userLogin,
);
route.post('/forget-password');
route.post('/refresh-token');
route.post('/reset-password');

export const authRoutes = route;
