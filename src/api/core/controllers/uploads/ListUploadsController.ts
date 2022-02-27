import { NextFunction, Response, Request } from 'express';

import { ListUploadsServices } from '@services/uploads/ListUploadsServices';

/**
 * @class ListUploadsController
 */
export class ListUploadsController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      let { page: queryPage, limit: limitPage } = request.query;

      const page = Number(queryPage) || 1;

      const limit = Number(limitPage) || 10;

      const services = new ListUploadsServices();

      const { uploads, disabled } = await services.execute({ page, limit });

      /** Set header  */
      response.set({
        'Disabled-range': disabled,
      });

      return response.json(uploads);
    } catch (error) {
      return next(error);
    }
  }
}
