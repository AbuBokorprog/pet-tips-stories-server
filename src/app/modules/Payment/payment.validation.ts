import { z } from 'zod';

export const createPaymentValidationSchema = z.object({
  amount: z
    .number({
      required_error: 'Amount is required',
    })
    .positive('Amount must be a positive number'), // Amount must be a positive number

  currency: z.string().optional().default('BDT'), // Optional currency, defaults to 'BDT'

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
});
