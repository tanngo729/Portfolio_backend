import { Skill } from './model.js';

export const getSkills = async (req, res) => {
  const { category } = req.query;

  const filter = {};
  if (category) filter.category = category;

  const skills = await Skill.find(filter).sort({ category: 1, level: -1 });

  res.json({ ok: true, data: skills });
};

// Admin endpoints
export const createSkill = async (req, res) => {
  const skill = await Skill.create(req.body);
  res.status(201).json({ ok: true, data: skill });
};

export const updateSkill = async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!skill) {
    return res.status(404).json({
      ok: false,
      code: 'NOT_FOUND',
      message: 'Skill not found',
    });
  }

  res.json({ ok: true, data: skill });
};

export const deleteSkill = async (req, res) => {
  const skill = await Skill.findByIdAndDelete(req.params.id);

  if (!skill) {
    return res.status(404).json({
      ok: false,
      code: 'NOT_FOUND',
      message: 'Skill not found',
    });
  }

  res.json({ ok: true, message: 'Skill deleted' });
};
