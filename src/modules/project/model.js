import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      match: /^[a-z0-9-]+$/,
    },
    tags: {
      type: [String],
      index: true,
      default: [],
    },
    thumbnail: {
      url: {
        type: String,
        required: true,
      },
      alt: String,
      width: Number,
      height: Number,
    },
    description_short: {
      type: String,
      maxlength: 150,
    },
    content: {
      type: String,
      required: true,
    },
    live_url: {
      type: String,
      match: /^https?:\/\/.+/,
    },
    github_url: {
      type: String,
      match: /^https?:\/\/.+/,
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);
