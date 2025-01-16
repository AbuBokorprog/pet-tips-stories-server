import mongoose, { model, Schema } from 'mongoose';
import { IUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: {
      type: String,
      default:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2NIXc73ZgxZfbifJP3Bsv35sekQyklo-9JA&s',
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'user',
      default: [],
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'user',
      default: [],
    },
    posts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'post',
      default: [],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    bio: {
      type: String,
      default: null,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    paymentHistory: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'payment',
      default: [],
    },
    subscriptionExpiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.salt));
  next();
});

export const userModel = model<IUser>('user', userSchema);
