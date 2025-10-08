import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import projectRoutes from '../routes.js';
import { Project } from '../model.js';

const app = express();
app.use(express.json());
app.use('/api/projects', projectRoutes);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/portfolio-test');
  await Project.create({
    title: 'Test Project',
    slug: 'test-project',
    tags: ['test'],
    thumbnail: { url: 'https://example.com/img.jpg' },
    content: 'Test content',
  });
});

afterAll(async () => {
  await Project.deleteMany({});
  await mongoose.connection.close();
});

describe('GET /api/projects', () => {
  it('should return projects with correct shape', async () => {
    const res = await request(app).get('/api/projects');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('ok', true);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body).toHaveProperty('meta');
    expect(res.body.meta).toHaveProperty('page');
    expect(res.body.meta).toHaveProperty('limit');
    expect(res.body.meta).toHaveProperty('total');
    expect(res.body.meta).toHaveProperty('hasNext');
  });
});
