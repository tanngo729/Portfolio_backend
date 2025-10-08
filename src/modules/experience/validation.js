import { z } from 'zod';

export const createExperienceSchema = z.object({
  title: z.string().min(1).trim(),
  company: z.string().min(1).trim(),
  location: z.string().trim().optional(),
  startDate: z.string().datetime().or(z.date()),
  endDate: z.string().datetime().or(z.date()).optional(),
  current: z.boolean().optional(),
  description: z.string().trim().optional(),
  technologies: z.array(z.string()).optional(),
  order: z.number().int().optional(),
});

export const updateExperienceSchema = createExperienceSchema.partial();

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
