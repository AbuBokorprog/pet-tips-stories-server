import { ObjectId } from 'mongoose';

export interface IPayment {
  user: ObjectId;
  subscription: ObjectId;
  amount: number;
  currency?: string;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'failed';
  paymentDate?: Date;
  tran_id?: string;
  isPaymentSuccess?: boolean;
  paymentStatus?: 'paid' | 'unpaid';
}
