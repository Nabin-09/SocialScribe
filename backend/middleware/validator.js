import { PLATFORMS, TONES } from '../utils/constants.js';
import { HTTP_STATUS } from '../utils/constants.js';

export const validateGenerateRequest = (req, res, next) => {
  const { platform, tone, topic } = req.body;

  const errors = [];

  if (!platform || !PLATFORMS.includes(platform)) {
    errors.push(`Invalid platform. Must be one of: ${PLATFORMS.join(', ')}`);
  }

  if (!tone || !TONES.includes(tone)) {
    errors.push(`Invalid tone. Must be one of: ${TONES.join(', ')}`);
  }

  if (!topic || topic.trim().length === 0) {
    errors.push('Topic is required');
  }

  if (topic && topic.length > 500) {
    errors.push('Topic cannot exceed 500 characters');
  }

  if (errors.length > 0) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

export const validateMongoId = (req, res, next) => {
  const { id } = req.params;

  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: 'Invalid post ID format',
    });
  }

  next();
};
