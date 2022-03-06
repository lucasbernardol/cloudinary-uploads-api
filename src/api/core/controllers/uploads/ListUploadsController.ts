import { NextFunction, Response, Request } from 'express';

import { ListUploadsServices } from '@services/uploads/ListUploadsServices';

/**
 * @class ListUploadsController
 */
export class ListUploadsController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      let { page, limit } = request.query;

      const services = new ListUploadsServices();

      const { _metadata, uploads, disabled } = await services.execute({
        page: Number(page),
        limit: Number(limit),
      });

      /** Set header  */
      response.set({ 'Disabled-range': disabled });

      return response.json({ uploads, _metadata });
    } catch (error) {
      return next(error);
    }
  }
}
