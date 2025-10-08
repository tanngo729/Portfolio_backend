import { z } from 'zod';

export const createSkillSchema = z.object({
  name: z.string().min(1).trim(),
  category: z.enum(['frontend', 'backend', 'design', 'other']),
  level: z.number().min(1).max(5),
});

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
