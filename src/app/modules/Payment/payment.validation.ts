import { z } from 'zod';

export const createPaymentValidationSchema = z.object({
  user: z
    .string({
      required_error: 'User ID is required',
    })
    .nonempty('User ID cannot be empty'), // User ID must be a valid string

  subscription: z
    .string({
      required_error: 'Subscription ID is required',
    })
    .nonempty('Subscription ID cannot be empty'), // Subscription ID must be a valid string

  paymentId: z
    .string({
      required_error: 'Payment ID is required',
    })
    .nonempty('Payment ID cannot be empty'), // Payment ID must be a valid string

  amount: z
    .number({
      required_error: 'Amount is required',
    })
    .positive('Amount must be a positive number'), // Amount must be a positive number

  currency: z.string().optional().default('BDT'), // Optional currency, defaults to 'BDT'

  paymentMethod: z.enum(['Stripe', 'Aamarpay'], {
    required_error: 'Payment method is required',
  }), // Enum for payment methods

  status: z
    .enum(['completed', 'pending', 'failed'], {
      required_error: 'Payment status is required',
    })
    .default('pending'), // Enum for payment status, defaults to 'pending'

  tran_id: z
    .string({
      required_error: 'Transaction ID is required',
    })
    .nonempty('Transaction ID cannot be empty'), // Transaction ID must be a valid string

  paymentDate: z
    .date()
    .optional()
    .default(() => new Date()), // Payment date defaults to the current date
});
