"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoute = void 0;
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const route = express_1.default.Router();
route.post('/success-payment', payment_controller_1.paymentController.confirmationController);
route.post('/failed-payment', payment_controller_1.paymentController.PaymentFailed);
exports.paymentRoute = route;
