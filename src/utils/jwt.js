import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const signToken = (payload, expiresIn = '7d') => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn });
};

export const verifyToken = (token) => {
  return jwt.verify(token, config.jwtSecret);
};
