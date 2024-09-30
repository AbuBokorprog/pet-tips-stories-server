import mongoose from 'mongoose';
import { IPayment } from './Payment.interface';

const PaymentSchema = new mongoose.Schema<IPayment>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user', // Reference to the User model
      required: true,
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
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
  },
  { timestamps: true },
);

export const Payment = mongoose.model('payment', PaymentSchema);
