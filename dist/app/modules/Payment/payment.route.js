"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoute = void 0;
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const auth_1 = require("../../middleware/auth");
const user_utils_1 = require("../User/user.utils");
const route = express_1.default.Router();
route.post('/payment', (0, auth_1.Auth)(user_utils_1.userRoles.ADMIN, user_utils_1.userRoles.USER), payment_controller_1.paymentController.paymentInitialize);
route.post('/success-payment', payment_controller_1.paymentController.confirmationController);
route.post('/failed-payment', payment_controller_1.paymentController.PaymentFailed);
exports.paymentRoute = route;
