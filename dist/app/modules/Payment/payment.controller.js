"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const payment_services_1 = require("./payment.services");
const confirmationController = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { transactionId } = req.query;
    const result = await payment_services_1.paymentServices.confirmationService(transactionId);
    res.send(result);
});
const PaymentFailed = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await payment_services_1.paymentServices.failedPayment();
    res.send(result);
});
exports.paymentController = {
    confirmationController,
    PaymentFailed,
};
