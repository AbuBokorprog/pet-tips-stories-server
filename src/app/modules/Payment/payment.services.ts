import { join } from 'path';
import { readFileSync } from 'fs';
import httpStatus from 'http-status';
import { PaymentUtils, verifyPayment } from './payment.utils';
import AppError from '../../errors/AppError';
import { IPayment } from './Payment.interface';
import { paymentModel } from './payment.model';
import { userModel } from '../User/user.model';
import { Types } from 'mongoose';

const paymentInitialize = async (userId: Types.ObjectId, payload: IPayment) => {
  payload.userId = userId;
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);
  payload.subscriptionStartDate = startDate;
  payload.subscriptionEndDate = new Date(endDate);

  payload.transactionId = `PR-${Date.now()}-${Math.floor(Math.random() * 10000)}-${userId}`;

  const isExistUser = await userModel.findById(userId);

  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  await paymentModel.create(payload);

  const result = await PaymentUtils(
    payload.amount,
    isExistUser,
    payload.transactionId,
  );

  return result;
};

const confirmationService = async (transactionId: string) => {
  const verifyResponse = await verifyPayment(transactionId);

  const isExistPayment = await paymentModel.findOne({
    transactionId: transactionId,
  });

  if (!isExistPayment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Payment not found!');
  }

  const isExistUser = userModel.findById(isExistPayment.userId);

  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    await paymentModel.findOneAndUpdate(
      { transactionId: transactionId },
      {
        status: 'completed',
      },
      {
        new: true,
        runValidators: true,
      },
    );

    const tran_id = isExistPayment._id;

    await userModel.findByIdAndUpdate(
      isExistPayment.userId,
      {
        $addToSet: { paymentHistory: tran_id },
        isPremium: true,
      },
      { new: true, runValidators: true },
    );
  }

  // eslint-disable-next-line no-undef
  const filePath = join(__dirname, '../../view/payment-success.html');
  const template = readFileSync(filePath, 'utf-8');

  return template;
};

const failedPayment = async () => {
  // eslint-disable-next-line no-undef
  const filePath = join(__dirname, '../../view/payment-failed.html');
  const template = readFileSync(filePath, 'utf-8');
  return template;
};

const retrieveHistory = async () => {
  const data = await paymentModel.find();

  return data;
};

export const paymentServices = {
  paymentInitialize,
  confirmationService,
  failedPayment,
  retrieveHistory,
};
