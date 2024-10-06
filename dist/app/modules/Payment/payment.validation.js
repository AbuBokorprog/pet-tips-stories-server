"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentValidationSchema = void 0;
const zod_1 = require("zod");
exports.createPaymentValidationSchema = zod_1.z.object({
    amount: zod_1.z
        .number({
        required_error: 'Amount is required',
    })
        .positive('Amount must be a positive number'), // Amount must be a positive number
    currency: zod_1.z.string().optional().default('BDT'), // Optional currency, defaults to 'BDT'
    status: zod_1.z
        .enum(['completed', 'pending', 'failed'], {
        required_error: 'Payment status is required',
    })
        .default('pending'), // Enum for payment status, defaults to 'pending'
    tran_id: zod_1.z
        .string({
        required_error: 'Transaction ID is required',
    })
        .nonempty('Transaction ID cannot be empty'), // Transaction ID must be a valid string
});
