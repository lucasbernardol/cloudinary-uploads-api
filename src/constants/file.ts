export const supportedMimetypes: string[] = [
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/svg',
];

export const multerRandomFilenameSizeInBytes = 12;

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
