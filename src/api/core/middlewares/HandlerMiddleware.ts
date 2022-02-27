import { NextFunction, Request, Response } from 'express';
import createCustomError, { HttpError, isHttpError } from 'http-errors';
import { MulterError } from 'multer';

export type ErrorType = Error | HttpError;

/**
 * @class HandleMiddleware
 */
export class HandleMiddleware {
  static instance: HandleMiddleware;

  /**
   * @private constructor
   */
  private constructor() {}

  static getInstance(): HandleMiddleware {
    const hasNotHandleMiddlewareInstance = !this.instance;

    if (hasNotHandleMiddlewareInstance) {
      this.instance = new HandleMiddleware();
    }

    return this.instance;
  }

  /** @description Express "not found" handler */
  public notFound() {
    return (request: Request, response: Response, next: NextFunction) => {
      const { hostname, path, method } = request;

      const extras = { hostname, path, method };

      return next(createCustomError(404, 'Not found, are yout lost?', extras));
    };
  }

  public multerError() {
    return (error: MulterError, _, response: Response, next: NextFunction) => {
      /** fixeds  */
      const name = 'BadRequestError';
      const status = 400;

      const actualIsMulterUploadError = error instanceof MulterError;

      if (!actualIsMulterUploadError) return next(error); // next Express handle

      const { message, ...details } = error;

      delete details['name'];
      delete details['code'];
      delete details['storageErrors'];

      const merged = { name, status, message, details };

      return response.status(status).json({ error: merged });
    };
  }

  public http() {
    return (error: ErrorType, _, response: Response, next: NextFunction) => {
      const actualErrorIsCustomHttp = isHttpError(error);

      if (!actualErrorIsCustomHttp) {
        console.log(error);

        const exception = { message: 'Internal Error!' };

        return response.status(500).json({ error: exception });
      }

      let { name, status, message, ...details } = error;

      // multer and custom httpError
      delete details['storageErrors'];

      const detailsKeysLessThanOne = Object.keys(details).length < 1;

      if (detailsKeysLessThanOne) details = null;

      const merged = { name, status, message, details };

      return response.status(status).json({ error: merged });
    };
  }
}

/**
 * @function createHandler
 */
export function createHandler(): HandleMiddleware {
  return HandleMiddleware.getInstance();
}
