import express from 'express';
import { paymentController } from './payment.controller';
import { Auth } from '../../middleware/auth';
import { userRoles } from '../User/user.utils';
const route = express.Router();

route.post(
  '/initialize',
  Auth(userRoles.ADMIN, userRoles.USER),
  paymentController.paymentInitialize,
);
route.post('/success-payment', paymentController.confirmationController);
route.post('/failed-payment', paymentController.PaymentFailed);
route.get('/history', paymentController.retrieveHistory);

export const paymentRoute = route;
