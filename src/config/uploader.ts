import multer, { Options } from 'multer';
import createCustomHttpError from 'http-errors';

import { extname } from 'path';
import crypto from 'crypto';

import { multerTemporaryUploadsDirectory } from '@constants/path';

import {
  multerRandomFilenameSizeInBytes,
  multerMaxFileSizeInBytes,
  supportedMimetypes,
} from '@constants/file';

const options: Options = {
  storage: multer.diskStorage({
    destination: multerTemporaryUploadsDirectory,
    filename: (request, multerFileOptions, callback) => {
      crypto.randomBytes(multerRandomFilenameSizeInBytes, (error, buffer) => {
        if (error) return callback(error, null);

        const bufferToFilenameStringHex = buffer.toString('hex');

        /**
         * @example: filename "a0a0ff4f45fb8ac4646a416160.jpg"
         */
        const randomFilename =
          bufferToFilenameStringHex + extname(multerFileOptions.originalname);

        return callback(null, randomFilename);
      });
    },
  }),

  limits: {
    fileSize: multerMaxFileSizeInBytes, // 3MB
    files: 10,
  },

  fileFilter: (request, multerFileObject, callback) => {
    const { mimetype: currentFileMimetype, originalname } = multerFileObject;

    const isSupportedMimetype = supportedMimetypes.some((mimetype) => {
      return mimetype === currentFileMimetype.toLowerCase();
    });

    /** @TODO Return a error message  */
    if (!isSupportedMimetype) {
      const extras = {
        filename: originalname,
        supported_size_bytes: multerMaxFileSizeInBytes, // sizes
        supported_mimetypes: [...supportedMimetypes],
      };

      const message = `Invalid mimetype: "${currentFileMimetype}", please try again later!`;

      return callback(createCustomHttpError(400, message, extras));
    }

    /**OK */
    return callback(null, true);
  },
};

export { options };
