"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentValidationSchema = void 0;
const zod_1 = require("zod");
exports.createPaymentValidationSchema = zod_1.z.object({
    user: zod_1.z
        .string({
        required_error: 'User ID is required',
    })
        .nonempty('User ID cannot be empty'), // User ID must be a valid string
    subscription: zod_1.z
        .string({
        required_error: 'Subscription ID is required',
    })
        .nonempty('Subscription ID cannot be empty'), // Subscription ID must be a valid string
    paymentId: zod_1.z
        .string({
        required_error: 'Payment ID is required',
    })
        .nonempty('Payment ID cannot be empty'), // Payment ID must be a valid string
    amount: zod_1.z
        .number({
        required_error: 'Amount is required',
    })
        .positive('Amount must be a positive number'), // Amount must be a positive number
    currency: zod_1.z.string().optional().default('BDT'), // Optional currency, defaults to 'BDT'
    paymentMethod: zod_1.z.enum(['Stripe', 'Aamarpay'], {
        required_error: 'Payment method is required',
    }), // Enum for payment methods
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
    paymentDate: zod_1.z
        .date()
        .optional()
        .default(() => new Date()), // Payment date defaults to the current date
});
