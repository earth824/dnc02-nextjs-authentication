import z from 'zod';

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1)
});

export type LoginInput = z.infer<typeof loginSchema>;

export const postSchema = z.object({
  title: z.string().trim().min(1)
});

export type PostInput = z.infer<typeof postSchema>;
