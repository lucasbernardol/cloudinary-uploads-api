import { NextFunction, Request, Response } from 'express';

import { UpdateUploadService } from '@services/uploads/UpdateUploadService';

import env from '@config/env';

/**
 * @class UpdateUploadController
 */
export class UpdateUploadController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const { filename, originalname, mimetype, path } = request.file;

      /** @example: 182.014.2...  */
      const clientIP = env.IS_NODE_ENV_DEVELOPMENT ? null : request.clientIp;

      const services = new UpdateUploadService();

      const { removed, updated } = await services.execute(id, {
        path,
        filename,
        mimetype,
        originalname,
        updated_by: clientIP,
      });

      const changed = { ...removed };

      return response.json({ changed, updated });
    } catch (error) {
      return next(error);
    }
  }
}
