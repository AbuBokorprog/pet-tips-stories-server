// import config from '../config';

import axios from 'axios';
import httpStatus from 'http-status';
import { IUser } from '../User/user.interface';
import AppError from '../../errors/AppError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars, @typescript-eslint/no-explicit-any
export const PaymentUtils = async (
  amount: number,
  user: IUser,
  transactionId: string,
) => {
  try {
    const response = await axios.post(
      'https://sandbox.aamarpay.com/jsonpost.php',
      {
        store_id: `aamarpaytest`,
        signature_key: `dbb74894e82415a2f7ff0ec3a97e4183`,
        tran_id: transactionId,
        success_url: `http://localhost:5000/api/payment/success-payment?transactionId=${transactionId}`,
        fail_url: 'http://localhost:5000/api/payment/failed-payment',
        cancel_url: 'https://pet-tips-stories-client.vercel.app/',
        amount: amount,
        currency: 'BDT',
        desc: 'Merchant Registration Payment',
        cus_name: user.username,
        cus_email: user.email,
        cus_add1: 'N/A',
        cus_add2: 'N/A',
        cus_city: 'N/A',
        cus_state: 'N/A',
        cus_postcode: 'N/A',
        cus_country: 'N/A',
        cus_phone: 'N/A',
        type: 'json',
      },
    );

    //console.log(response);
    return response.data;
  } catch (err) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Payment initiation failed!');
  }
};

export const verifyPayment = async (tnxId: string) => {
  try {
    const response = await axios.get(
      'https://sandbox.aamarpay.com/api/v1/trxcheck/request.php',
      {
        params: {
          store_id: 'aamarpaytest',
          signature_key: 'dbb74894e82415a2f7ff0ec3a97e4183',
          type: 'json',
          request_id: tnxId,
        },
      },
    );

    return response.data;
  } catch (err) {
    throw new Error('Payment validation failed!');
  }
};
