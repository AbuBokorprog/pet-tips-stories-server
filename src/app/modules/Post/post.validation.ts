import { z } from 'zod';

export const createPostValidationSchema = z.object({
  title: z.string().nonempty('Title is required'),
  content: z.string().nonempty('Content is required'),
  category: z.enum(['tips', 'story'], {
    errorMap: () => ({ message: 'Category must be either "tips" or "story"' }),
  }),
  comments: z.array(z.string()),
  downVotes: z.array(z.string()),
  upVotes: z.array(z.string()),
  image: z
    .array(z.string().url('Each image must be a valid URL'))
    .nonempty('At least one image is required'),
  premium: z.boolean().optional(),
  price: z.number().nullable().optional(),
});

export const updatePostValidationSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  category: z.enum(['tips', 'story']).optional(),
  comments: z.array(z.string()).optional(),
  downVotes: z.array(z.string()).optional(),
  upVotes: z.array(z.string()).optional(),
  image: z.array(z.string().url('Each image must be a valid URL')).optional(),
  premium: z.boolean().optional(),
  price: z.number().nullable().optional(),
});
