import 'express-async-errors';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config/env.js';
import { connectDB } from './config/db.js';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/error.js';

const app = express();

// Security & optimization
app.use(helmet());
app.use(compression());
app.use(cors({ origin: config.corsOrigins, credentials: true }));
app.use(morgan('dev'));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root endpoint for health check
app.get('/', (req, res) => {
  res.json({
    ok: true,
    service: 'Portfolio Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

// API routes
app.use('/api', routes);

// 404 handler (only for non-root paths)
app.use((req, res) => {
  if (req.path === '/' && req.method === 'HEAD') {
    return res.status(200).end();
  }
  res.status(404).json({
    ok: false,
    code: 'NOT_FOUND',
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// Error handler
app.use(errorHandler);

// Start server
const start = async () => {
  try {
    await connectDB();
    app.listen(config.port, () => {

    });
  } catch (error) {
    console.error(' Failed to start server:', error);
    process.exit(1);
  }
};

start();
