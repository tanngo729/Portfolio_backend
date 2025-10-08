import { Experience } from './model.js';

export const getExperiences = async (req, res) => {
  const experiences = await Experience.find().sort({ order: 1, startDate: -1 });
  res.json({ ok: true, data: experiences });
};

// Admin endpoints
export const createExperience = async (req, res) => {
  const experience = await Experience.create(req.body);
  res.status(201).json({ ok: true, data: experience });
};

export const updateExperience = async (req, res) => {
  const experience = await Experience.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!experience) {
    return res.status(404).json({
      ok: false,
      code: 'NOT_FOUND',
      message: 'Experience not found',
    });
  }

  res.json({ ok: true, data: experience });
};

export const deleteExperience = async (req, res) => {
  const experience = await Experience.findByIdAndDelete(req.params.id);

  if (!experience) {
    return res.status(404).json({
      ok: false,
      code: 'NOT_FOUND',
      message: 'Experience not found',
    });
  }

  res.json({ ok: true, message: 'Experience deleted' });
};
