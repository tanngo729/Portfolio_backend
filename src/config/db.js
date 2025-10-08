import mongoose from 'mongoose';
import { config } from './env.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri);

  } catch (error) {
    console.error(' MongoDB connection error:', error);
    throw error;
  }
};
