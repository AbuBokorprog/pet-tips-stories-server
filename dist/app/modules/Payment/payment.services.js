"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentServices = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const http_status_1 = __importDefault(require("http-status"));
const payment_utils_1 = require("./payment.utils");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const post_model_1 = require("../Post/post.model");
const payment_model_1 = require("./payment.model");
const user_model_1 = require("../User/user.model");
const paymentInitialize = async (payload) => {
    payload.transactionId = `${new Date()}-${payload.userId}`;
    const isExistUser = await user_model_1.userModel.findById(payload.userId);
    if (!isExistUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = await payment_model_1.paymentModel.create(payload);
    await (0, payment_utils_1.PaymentUtils)(payload.amount, isExistUser, payload.transactionId);
    return result;
};
const confirmationService = async (transactionId) => {
    const verifyResponse = await (0, payment_utils_1.verifyPayment)(transactionId);
    const isExistPost = await post_model_1.postModel.findOne({ tran_id: transactionId });
    if (!isExistPost) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Post not found!');
    }
    if (verifyResponse && verifyResponse.pay_status === 'Successful') {
        await post_model_1.postModel.findOneAndUpdate({ tran_id: transactionId }, {
            paymentStatus: 'Success',
            isPaymentSuccessful: true,
        }, {
            new: true,
            runValidators: true,
        });
        await isExistPost.save();
    }
    // eslint-disable-next-line no-undef
    const filePath = (0, path_1.join)(__dirname, '../../view/payment-successfull.html');
    const template = (0, fs_1.readFileSync)(filePath, 'utf-8');
    return template;
};
const failedPayment = async () => {
    // eslint-disable-next-line no-undef
    const filePath = (0, path_1.join)(__dirname, '../../view/payment-failed.html');
    const template = (0, fs_1.readFileSync)(filePath, 'utf-8');
    return template;
};
exports.paymentServices = {
    paymentInitialize,
    confirmationService,
    failedPayment,
};
