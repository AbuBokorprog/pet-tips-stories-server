import { ObjectId } from 'mongoose';

export interface IPayment {
  user: ObjectId;
  subscription: ObjectId;
  amount: number;
  currency?: string;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'failed';
  tran_id: string;
  paymentDate?: Date;
}
