import { Router } from 'express';
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from './controller.js';
import { validate, createExperienceSchema, updateExperienceSchema } from './validation.js';
import { authenticate } from '../../middlewares/auth.js';

const router = Router();

router.get('/', getExperiences);

// Admin routes
router.get('/admin', authenticate, getExperiences);
router.post('/admin', authenticate, validate(createExperienceSchema), createExperience);
router.put('/admin/:id', authenticate, validate(updateExperienceSchema), updateExperience);
router.delete('/admin/:id', authenticate, deleteExperience);

export default router;
