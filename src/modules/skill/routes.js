import { Router } from 'express';
import { getSkills, createSkill, updateSkill, deleteSkill } from './controller.js';
import { validate, createSkillSchema } from './validations.js';
import { authenticate } from '../../middlewares/auth.js';

const router = Router();

router.get('/', getSkills);

// Admin routes
router.post('/admin/skills', authenticate, validate(createSkillSchema), createSkill);
router.put('/admin/skills/:id', authenticate, validate(createSkillSchema), updateSkill);
router.delete('/admin/skills/:id', authenticate, deleteSkill);

export default router;
