import express from 'express';
import { createUserValidation } from '../User/user.validation';
import { authControllers } from './auth.controller';
import { validationRequest } from '../../utils/validationRequest';
import { loginValidationSchema } from './auth.validation';
import { upload } from '../../utils/imageUploader';
const route = express.Router();

route.post(
  '/register',
  upload.single('file'),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validationRequest(createUserValidation),
  authControllers.createUser,
);

route.post(
  '/login',
  validationRequest(loginValidationSchema),
  authControllers.userLogin,
);
route.post('/forget-password');
route.post('/refresh-token');
route.post('/reset-password');

export const authRoutes = route;
