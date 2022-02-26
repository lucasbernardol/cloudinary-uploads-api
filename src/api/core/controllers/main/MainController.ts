import { NextFunction, Request, Response } from 'express';

import { IMainRequestResponse } from '@shared/interface/types/IMainRequestResponse';

/**
 * - Path: "/api"
 * @class MainController
 */
export class MainController {
  public constructor() {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const repo = 'https://github.com/lucasbernardol/cloudinary-uploads-api';

      const currentDateInSecondsOrUnix = Math.ceil(Date.now() / 1000);

      const api: IMainRequestResponse = {
        version: '1.0.0',
        date: currentDateInSecondsOrUnix,
        author: {
          name: 'José Lucas',
          github: 'lucasbernardol',
        },
        application_repository: repo,
        status: 'working',
      };

      const extras = {
        host: request.hostname,
        method: request.method,
      };

      return response.json({ api, extras });
    } catch (error) {
      return next(error);
    }
  }
}
