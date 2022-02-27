import { NextFunction, Request, Response } from 'express';

import { FindUploadByIdService } from '@services/uploads/FindUploadByIdService';

/**
 * @class FindUploadByIdController
 */
export class FindUploadByIdController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const services = new FindUploadByIdService();

      const upload = await services.execute(id);

      return response.json(upload);
    } catch (error) {
      return next(error);
    }
  }
}
