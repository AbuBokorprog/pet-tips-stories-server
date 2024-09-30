"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PaymentSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user', // Reference to the User model
        required: true,
    },
    subscription: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'subscription', // Reference to the Subscription model
        required: true,
    },
    amount: {
        type: Number, // The amount paid
        required: true,
    },
    currency: {
        type: String, // Currency code (e.g., USD, BDT)
        default: 'BDT',
    },
    paymentMethod: {
        type: String, // e.g., 'Stripe', 'Aamarpay'
        required: true,
    },
    status: {
        type: String, // e.g., 'completed', 'pending', 'failed'
        enum: ['completed', 'pending', 'failed'],
        default: 'pending',
        required: true,
    },
    tran_id: {
        type: String,
        required: true,
    },
    paymentDate: {
        type: Date, // Date of the payment
        default: Date.now,
        required: true,
    },
}, { timestamps: true });
exports.Payment = mongoose_1.default.model('payment', PaymentSchema);
