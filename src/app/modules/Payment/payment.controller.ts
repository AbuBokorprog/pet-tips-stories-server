import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { paymentServices } from './payment.services';
import successResponse from '../../utils/successRespon';
import httpStatus from 'http-status';

const paymentInitialize = catchAsync(async (req, res) => {
  const user = req.user;
  const data = await paymentServices.paymentInitialize(
    user && user._id,
    req.body,
  );

  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Payment initialized.',
    data,
  });
});

const confirmationController = catchAsync(
  async (req: Request, res: Response) => {
    const { transactionId } = req.query;

    const result = await paymentServices.confirmationService(
      transactionId as string,
    );
    res.send(result);
  },
);

const PaymentFailed = catchAsync(async (req, res) => {
  const result = await paymentServices.failedPayment();

  res.send(result);
});

const retrieveHistory = catchAsync(async (req, res) => {
  const data = await paymentServices.retrieveHistory();

  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Payment history.',
    data,
  });
});

export const paymentController = {
  confirmationController,
  PaymentFailed,
  paymentInitialize,
  retrieveHistory,
};
