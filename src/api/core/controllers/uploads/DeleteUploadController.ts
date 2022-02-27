import { NextFunction, Request, Response } from 'express';

import { DeleteUploadService } from '@services/uploads/DeleteUploadService';

/**
 * @class DeleteUploadController
 */
export class DeleteUploadController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const services = new DeleteUploadService();

      const deleted = await services.execute(id);

      return response.json(deleted);
    } catch (error) {
      return next(error);
    }
  }
}
