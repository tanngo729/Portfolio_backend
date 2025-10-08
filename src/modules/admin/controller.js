import { Admin } from './model.js';
import { signToken } from '../../utils/jwt.js';

export const login = async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username, isActive: true });

  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({
      ok: false,
      code: 'INVALID_CREDENTIALS',
      message: 'Invalid username or password',
    });
  }

  const token = signToken({
    id: admin._id,
    username: admin.username,
    role: admin.role,
  });

  res.json({
    ok: true,
    data: {
      token,
      admin: admin.toJSON(),
    },
  });
};

export const getProfile = async (req, res) => {
  const admin = await Admin.findById(req.user.id);

  if (!admin) {
    return res.status(404).json({
      ok: false,
      code: 'NOT_FOUND',
      message: 'Admin not found',
    });
  }

  res.json({ ok: true, data: admin });
};

export const createAdmin = async (req, res) => {
  const admin = await Admin.create(req.body);
  res.status(201).json({ ok: true, data: admin });
};

export const getAllAdmins = async (req, res) => {
  const admins = await Admin.find().sort('-createdAt');
  res.json({ ok: true, data: admins });
};
