import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    message: {
      type: String,
      required: true,
      minlength: 10,
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied'],
      default: 'new',
    },
    ip: String,
    userAgent: String,
  },
  { timestamps: true }
);

export const ContactMessage = mongoose.model('ContactMessage', contactSchema);
