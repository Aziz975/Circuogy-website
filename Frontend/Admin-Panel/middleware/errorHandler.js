import multer from 'multer';
import env from '../config/env.js';

const notFound = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Invalid JSON body.' });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ message: 'Request body is too large.' });
  }

  // Upload errors (file too large, unexpected field, ...)
  if (err instanceof multer.MulterError) {
    const tooLarge = err.code === 'LIMIT_FILE_SIZE';
    return res.status(tooLarge ? 413 : 400).json({
      message: tooLarge ? 'Image size must be less than 5 MB.' : `Upload failed: ${err.message}`,
    });
  }

  const status = err.status || 500;
  if (status >= 500) console.error(err);

  res.status(status).json({
    message: status >= 500 && env.isProd ? 'Something went wrong on the server.' : err.message,
    ...(err.details ? { errors: err.details } : {}),
  });
};

export { notFound, errorHandler };

