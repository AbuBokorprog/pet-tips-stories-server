"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const payment_services_1 = require("./payment.services");
const successRespon_1 = __importDefault(require("../../utils/successRespon"));
const http_status_1 = __importDefault(require("http-status"));
const paymentInitialize = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const user = req.user;
    const data = await payment_services_1.paymentServices.paymentInitialize(user && user._id, req.body);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Payment initialized.',
        data,
    });
});
const confirmationController = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { transactionId } = req.query;
    const result = await payment_services_1.paymentServices.confirmationService(transactionId);
    res.send(result);
});
const PaymentFailed = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await payment_services_1.paymentServices.failedPayment();
    res.send(result);
});
const retrieveHistory = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = await payment_services_1.paymentServices.retrieveHistory();
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Payment history.',
        data,
    });
});
exports.paymentController = {
    confirmationController,
    PaymentFailed,
    paymentInitialize,
    retrieveHistory,
};
