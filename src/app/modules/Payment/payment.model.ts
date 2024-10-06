import mongoose, { Schema } from 'mongoose';
import { IPayment } from './Payment.interface';

const PaymentSchema = new mongoose.Schema<IPayment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    paymentProvider: {
      type: String,
      default: 'aamarpay',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'BDT',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    transactionId: {
      type: String,
      required: true,
    },
    subscriptionStartDate: {
      type: Date,
      default: new Date(),
      required: true,
    },
    subscriptionEndDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export const paymentModel = mongoose.model('payment', PaymentSchema);
