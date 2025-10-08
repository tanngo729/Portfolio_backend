import { Router } from 'express';
import { login, getProfile, createAdmin, getAllAdmins } from './controller.js';
import { validate, loginSchema, createAdminSchema } from './validations.js';
import { authenticate } from '../../middlewares/auth.js';

const router = Router();

// Public routes
router.post('/login', validate(loginSchema), login);

// Protected routes
router.get('/profile', authenticate, getProfile);
router.get('/admins', authenticate, getAllAdmins);
router.post('/admins', authenticate, validate(createAdminSchema), createAdmin);

export default router;
