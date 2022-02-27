import { Request, Response, NextFunction } from 'express';

import { CreateUploadService } from '@services/uploads/CreateUploadService';

/**
 * @class CreateUploadController
 */
export class CreateUploadController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { filename, mimetype, originalname, path } = request.file;

      const services = new CreateUploadService();

      const upload = await services.execute({
        filename,
        mimetype,
        originalname,
        path,
      });

      return response.status(201).json(upload);
    } catch (error) {
      return next(error);
    }
  }
}
