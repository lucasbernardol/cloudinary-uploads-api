import { Request, Response, NextFunction } from 'express';

import { CreateUploadService } from '@services/uploads/CreateUploadService';

import env from '@config/env';

/**
 * @class CreateUploadController
 */
export class CreateUploadController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { filename, mimetype, originalname, path } = request.file;

      /** @example: 182.157.0...  */
      const clientIP = env.IS_NODE_ENV_DEVELOPMENT ? null : request.clientIp;

      const services = new CreateUploadService();

      const upload = await services.execute({
        filename,
        mimetype,
        originalname,
        path,
        uploaded_by: clientIP,
      });

      return response.status(201).json(upload);
    } catch (error) {
      return next(error);
    }
  }
}
