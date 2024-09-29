import { z } from 'zod';

export const createUserValidation = z.object({
  username: z.string({
    required_error: 'Name is required',
  }),
  email: z.string({
    required_error: 'Email is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
  role: z.enum(['admin', 'user']).optional(),
});

export const updateUserValidation = z.object({
  username: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  role: z.enum(['admin', 'user']).optional(),
});

export const loginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
