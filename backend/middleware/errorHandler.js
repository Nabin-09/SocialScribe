import { HTTP_STATUS } from '../utils/constants.js';
import logger from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  logger.error('Error caught:', err.message);
  logger.debug('Stack trace:', err.stack);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  // Mongoose cast error (invalid ID)
  if (err.name === 'CastError') {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: 'Invalid ID format',
    });
  }

  // Default error
  res.status(err.statusCode || HTTP_STATUS.INTERNAL_ERROR).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export const notFoundHandler = (req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: `Route ${req.method} ${req.url} not found`,
  });
};
