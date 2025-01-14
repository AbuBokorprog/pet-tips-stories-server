import { z } from 'zod';

const createCategoryValidationSchema = z.object({
  name: z.string().min(1, 'Please type category name!'),
});

const updateCategoryValidationSchema = z.object({
  name: z.string().optional(),
});

export const createCategoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
