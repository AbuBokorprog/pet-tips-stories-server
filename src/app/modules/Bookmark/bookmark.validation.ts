import { z } from 'zod';

const createBookmarkValidationSchema = z.object({
  id: z.string().min(1, 'Please type category name!'),
});

export const BookmarkValidation = {
  createBookmarkValidationSchema,
};
