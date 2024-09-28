"use strict";
// import config from '../config';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.PaymentUtils = void 0;
const axios_1 = __importDefault(require("axios"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars, @typescript-eslint/no-explicit-any
const PaymentUtils = async (amount, user, transactionId) => {
    try {
        const response = await axios_1.default.post('https://sandbox.aamarpay.com/jsonpost.php', {
            store_id: `aamarpaytest`,
            signature_key: `dbb74894e82415a2f7ff0ec3a97e4183`,
            tran_id: transactionId,
            success_url: `https://bike-rental-services.vercel.app/api/payment/success-payment?transactionId=${transactionId}`,
            fail_url: 'https://bike-rental-services.vercel.app/api/payment/failed-payment',
            cancel_url: 'https://rentmyride-theta.vercel.app/',
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
        });
        //console.log(response);
        return response.data;
    }
    catch (err) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Payment initiation failed!');
    }
};
exports.PaymentUtils = PaymentUtils;
const verifyPayment = async (tnxId) => {
    try {
        const response = await axios_1.default.get('https://sandbox.aamarpay.com/api/v1/trxcheck/request.php', {
            params: {
                store_id: 'aamarpaytest',
                signature_key: 'dbb74894e82415a2f7ff0ec3a97e4183',
                type: 'json',
                request_id: tnxId,
            },
        });
        return response.data;
    }
    catch (err) {
        throw new Error('Payment validation failed!');
    }
};
exports.verifyPayment = verifyPayment;
