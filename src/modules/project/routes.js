import { Router } from 'express';
import {
  getProjects,
  getProjectBySlug,
  getAllProjectsAdmin,
  createProject,
  updateProject,
  deleteProject,
} from './controller.js';
import {
  validate,
  createProjectSchema,
  updateProjectSchema,
} from './validations.js';
import { authenticate } from '../../middlewares/auth.js';

const router = Router();

router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);

// Admin routes
router.get('/admin/projects', authenticate, getAllProjectsAdmin);
router.post(
  '/admin/projects',
  authenticate,
  validate(createProjectSchema),
  createProject
);
router.put(
  '/admin/projects/:id',
  authenticate,
  validate(updateProjectSchema),
  updateProject
);
router.delete('/admin/projects/:id', authenticate, deleteProject);

export default router;
