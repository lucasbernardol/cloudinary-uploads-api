/**
 * @constant supportedMimetypes
 */
export const supportedMimetypes: string[] = [
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/svg+xml',
  'image/svg',
];

/**
 * @constant multerRandomFileSizeInBytes
 */
export const multerRandomFilenameSizeInBytes = 20;

/**
 * - Max: `3MB`
 * @constant multerMaxFileSizeInBytes
 */
export const multerMaxFileSizeInBytes = 3 * 1024 * 1024;

/**
 * - Max: `3MB`
 * @constant multerMaxFileSizeInString
 */
export const multerMaxFileSizeInString = '3MB';
