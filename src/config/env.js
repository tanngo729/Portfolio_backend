import dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 4000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-me',
  corsOrigins: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',')
    : ['http://localhost:5173'],
};
