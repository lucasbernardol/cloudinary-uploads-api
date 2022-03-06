import { NextFunction, Request, Response } from 'express';

import { IMainRequestResponse } from '@shared/interface/types/IMainRequestResponse';

/**
 * @class MainController
 */
export class MainController {
  public constructor() {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      // Unix date (milliseconds to seconds)
      const actualDateInMillisecondsOrUnix = Math.ceil(Date.now() / 1000);

      const api: IMainRequestResponse = {
        version: '1.0.0',
        author: {
          name: 'José Lucas',
          github: 'lucasbernardol',
        },
        status: 'working',
        repository: 'https://github.com/lucasbernardol/cloudinary-uploads-api',
        timestamp: actualDateInMillisecondsOrUnix,
      };

      return response.json({ api });
    } catch (error) {
      return next(error);
    }
  }
}
