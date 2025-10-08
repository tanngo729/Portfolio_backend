import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
  createContact,
  getAllContacts,
  updateContactStatus,
  deleteContact,
} from './controller.js';
import { validate, createContactSchema } from './validations.js';
import { authenticate } from '../../middlewares/auth.js';

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3,
  message: {
    ok: false,
    code: 'RATE_LIMIT',
    message: 'Too many contact requests. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public route
router.post('/', contactLimiter, validate(createContactSchema), createContact);

// Admin routes
router.get('/admin/contacts', authenticate, getAllContacts);
router.patch('/admin/contacts/:id', authenticate, updateContactStatus);
router.delete('/admin/contacts/:id', authenticate, deleteContact);

export default router;
