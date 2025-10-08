import { ZodError } from 'zod';

export const errorHandler = (err, req, res, _next) => {
  console.error('Error:', err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      ok: false,
      code: 'VALIDATION_ERROR',
      message: 'Invalid payload',
      issues: err.errors.map((e) => ({
        path: e.path,
        message: e.message,
      })),
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      ok: false,
      code: 'VALIDATION_ERROR',
      message: err.message,
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      ok: false,
      code: 'INVALID_ID',
      message: 'Invalid resource ID',
    });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    ok: false,
    code: err.code || 'INTERNAL_ERROR',
    message: err.message || 'Internal server error',
  });
};
