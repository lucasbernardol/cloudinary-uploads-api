import { NextFunction, Request, Response } from 'express';

import { FindUploadsByOriginalnameServices } from '@services/uploads/FindUploadsByOriginalnameServices';

/**
 * @class FindUploadsByOriginalnameController
 */
export class FindUploadsByOriginalnameController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { page, limit } = request.query;

      const { name } = request.params;

      const services = new FindUploadsByOriginalnameServices();

      const { uploads, disabled } = await services.execute(
        { originalname: name },
        {
          page: Number(page),
          limit: Number(limit),
        }
      );

      response.set({ 'Disabled-range': disabled });

      return response.json(uploads);
    } catch (error) {
      return next(error);
    }
  }
}
