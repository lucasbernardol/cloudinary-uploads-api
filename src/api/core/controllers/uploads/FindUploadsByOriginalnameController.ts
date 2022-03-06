import { NextFunction, Request, Response } from 'express';

import { FindUploadsByOriginalnameServices } from '@services/uploads/FindUploadsByOriginalnameServices';

/**
 * @class FindUploadsByOriginalnameController
 */
export class FindUploadsByOriginalnameController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { page, limit } = request.query;

      const { originalname } = request.params;

      const services = new FindUploadsByOriginalnameServices();

      const { uploads, _metadata, disabled } = await services.execute(
        { originalname },
        {
          page: Number(page),
          limit: Number(limit),
        }
      );

      /** Set headers  */
      response.set({ 'Disabled-range': disabled });

      return response.json({ uploads, _metadata });
    } catch (error) {
      return next(error);
    }
  }
}
