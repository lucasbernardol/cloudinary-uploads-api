import { resolve } from 'path';

/**
 * - Temporary uploads directory
 * @constant multerTemporaryUploadsDirectory
 */
export const multerTemporaryUploadsDirectory = resolve(
  __dirname,
  '..',
  '..',
  'temp',
  'uploads'
);
