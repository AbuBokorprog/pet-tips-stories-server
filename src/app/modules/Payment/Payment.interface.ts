import { Types } from 'mongoose';

export interface IPayment {
  userId: Types.ObjectId; // Reference to the user ID
  paymentProvider: 'aamarpay'; // Payment provider used for the transaction
  amount: number; // Amount paid
  currency: 'BDT'; // Currency used for the transaction
  status: 'pending' | 'completed' | 'failed'; // Payment status
  transactionId: string; // Unique identifier for the payment
  subscriptionStartDate: Date; // When the subscription starts
  subscriptionEndDate: Date; // When the subscription ends
}

// Example usage
// const exampleSubscriptionPayment: ISubscriptionPayment = {
//   userId: '60f5a3d9c2b7f72c3c9f5aab',
//   paymentProvider: 'stripe',
//   amount: 19.99,
//   currency: 'USD',
//   status: 'completed',
//   transactionId: 'txn_1234567890',
//   subscriptionStartDate: new Date('2024-01-01'),
//   subscriptionEndDate: new Date('2024-12-31'),
//   createdAt: new Date(),
// };
