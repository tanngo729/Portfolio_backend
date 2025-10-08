import { Router } from 'express';
import { getSettings, updateSettings, resetSettings } from './controller.js';
import { validate, updateSettingsSchema } from './validation.js';
import { authenticate } from '../../middlewares/auth.js';

const router = Router();

// Public route - anyone can view settings
router.get('/', getSettings);

// Protected routes - admin only
router.put('/', authenticate, validate(updateSettingsSchema), updateSettings);
router.post('/reset', authenticate, resetSettings);

export default router;
