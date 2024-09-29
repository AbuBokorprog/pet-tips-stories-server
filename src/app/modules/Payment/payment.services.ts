import { join } from 'path';
import { readFileSync } from 'fs';
import httpStatus from 'http-status';
import { verifyPayment } from './payment.utils';
import AppError from '../../errors/AppError';
import { postModel } from '../Post/post.model';

const confirmationService = async (transactionId: string) => {
  const verifyResponse = await verifyPayment(transactionId);
  const isExistPost = await postModel.findOne({ tran_id: transactionId });

  if (!isExistPost) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found!');
  }

  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    await postModel.findOneAndUpdate(
      { tran_id: transactionId },
      {
        paymentStatus: 'Success',
        isPaymentSuccessful: true,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    await isExistPost.save();
  }

  // eslint-disable-next-line no-undef
  const filePath = join(__dirname, '../../view/payment-successfull.html');
  const template = readFileSync(filePath, 'utf-8');

  return template;
};

const failedPayment = async () => {
  // eslint-disable-next-line no-undef
  const filePath = join(__dirname, '../../view/payment-failed.html');
  const template = readFileSync(filePath, 'utf-8');
  return template;
};

export const paymentServices = {
  confirmationService,
  failedPayment,
};
