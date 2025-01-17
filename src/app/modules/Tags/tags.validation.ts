import { z } from 'zod';

const createTagValidationSchema = z.object({
  name: z.string().min(1, 'Please type category name!'),
});

const updateTagValidationSchema = z.object({
  name: z.string().optional(),
});

export const TagValidation = {
  createTagValidationSchema,
  updateTagValidationSchema,
};
