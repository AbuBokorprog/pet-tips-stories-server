import { z } from 'zod';

export const createComment = z.object({
  postId: z.string(),
  content: z.string(),
});

export const updateComment = z.object({
  content: z.string(),
});
