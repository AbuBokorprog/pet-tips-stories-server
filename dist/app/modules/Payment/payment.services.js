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
const payment_model_1 = require("./payment.model");
const user_model_1 = require("../User/user.model");
const paymentInitialize = async (userId, payload) => {
    payload.userId = userId;
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);
    payload.subscriptionStartDate = startDate;
    payload.subscriptionEndDate = new Date(endDate);
    payload.transactionId = `PR-${Date.now()}-${Math.floor(Math.random() * 10000)}-${userId}`;
    const isExistUser = await user_model_1.userModel.findById(userId);
    if (!isExistUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    await payment_model_1.paymentModel.create(payload);
    const result = await (0, payment_utils_1.PaymentUtils)(payload.amount, isExistUser, payload.transactionId);
    return result;
};
const confirmationService = async (transactionId) => {
    const verifyResponse = await (0, payment_utils_1.verifyPayment)(transactionId);
    const isExistPayment = await payment_model_1.paymentModel.findOne({
        transactionId: transactionId,
    });
    if (!isExistPayment) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Payment not found!');
    }
    const isExistUser = user_model_1.userModel.findById(isExistPayment.userId);
    if (!isExistUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    if (verifyResponse && verifyResponse.pay_status === 'Successful') {
        await payment_model_1.paymentModel.findOneAndUpdate({ transactionId: transactionId }, {
            status: 'completed',
        }, {
            new: true,
            runValidators: true,
        });
        const tran_id = isExistPayment._id;
        await user_model_1.userModel.findByIdAndUpdate(isExistPayment.userId, {
            $addToSet: { paymentHistory: tran_id },
            isPremium: true,
        }, { new: true, runValidators: true });
    }
    // eslint-disable-next-line no-undef
    const filePath = (0, path_1.join)(__dirname, '../../view/payment-success.html');
    const template = (0, fs_1.readFileSync)(filePath, 'utf-8');
    return template;
};
const failedPayment = async () => {
    // eslint-disable-next-line no-undef
    const filePath = (0, path_1.join)(__dirname, '../../view/payment-failed.html');
    const template = (0, fs_1.readFileSync)(filePath, 'utf-8');
    return template;
};
const retrieveHistory = async () => {
    const data = await payment_model_1.paymentModel.find();
    return data;
};
exports.paymentServices = {
    paymentInitialize,
    confirmationService,
    failedPayment,
    retrieveHistory,
};
