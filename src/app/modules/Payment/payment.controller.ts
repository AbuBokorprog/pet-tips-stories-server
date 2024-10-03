import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { paymentServices } from './payment.services';
import successResponse from '../../utils/successRespon';
import httpStatus from 'http-status';

const paymentInitialize = catchAsync(async (req, res) => {
  const data = await paymentServices.paymentInitialize(req.body);

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

export const paymentController = {
  confirmationController,
  PaymentFailed,
  paymentInitialize,
};
