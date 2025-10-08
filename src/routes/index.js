import { Router } from 'express';
import projectRoutes from '../modules/project/routes.js';
import skillRoutes from '../modules/skill/routes.js';
import contactRoutes from '../modules/contact/routes.js';
import adminRoutes from '../modules/admin/routes.js';
import settingsRoutes from '../modules/settings/routes.js';
import experienceRoutes from '../modules/experience/routes.js';

const router = Router();

router.use('/projects', projectRoutes);
router.use('/skills', skillRoutes);
router.use('/contact', contactRoutes);
router.use('/admin', adminRoutes);
router.use('/settings', settingsRoutes);
router.use('/experiences', experienceRoutes);

export default router;
