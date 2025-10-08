import { z } from 'zod';

export const createProjectSchema = z.object({
  title: z.string().min(1).trim(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  tags: z.array(z.string()).optional(),
  thumbnail: z.object({
    url: z.string().url(),
    alt: z.string().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
  }),
  description_short: z.string().max(150).optional(),
  content: z.string().min(1),
  live_url: z.string().url().optional().or(z.literal('')),
  github_url: z.string().url().optional().or(z.literal('')),
});

export const updateProjectSchema = createProjectSchema.partial();

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
