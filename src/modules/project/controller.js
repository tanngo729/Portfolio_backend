import { Project } from './model.js';

export const getProjects = async (req, res) => {
  const { tag, sort = '-createdAt', limit = 10, page = 1 } = req.query;

  const filter = {};
  if (tag) filter.tags = tag;

  const skip = (page - 1) * limit;
  const total = await Project.countDocuments(filter);

  const projects = await Project.find(filter)
    .sort(sort)
    .limit(parseInt(limit))
    .skip(skip)
    .select('-content');

  res.json({
    ok: true,
    data: projects,
    meta: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      hasNext: skip + projects.length < total,
    },
  });
};

export const getProjectBySlug = async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug });

  if (!project) {
    return res.status(404).json({
      ok: false,
      code: 'NOT_FOUND',
      message: 'Project not found',
    });
  }

  res.json({ ok: true, data: project });
};

// Admin endpoint - get all projects with full content
export const getAllProjectsAdmin = async (req, res) => {
  const projects = await Project.find().sort('-createdAt');
  res.json({ ok: true, data: projects });
};

export const createProject = async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json({ ok: true, data: project });
};

export const updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!project) {
    return res.status(404).json({
      ok: false,
      code: 'NOT_FOUND',
      message: 'Project not found',
    });
  }

  res.json({ ok: true, data: project });
};

export const deleteProject = async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    return res.status(404).json({
      ok: false,
      code: 'NOT_FOUND',
      message: 'Project not found',
    });
  }

  res.json({ ok: true, message: 'Project deleted' });
};
