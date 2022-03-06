import { Router } from 'express';

import { MainController } from '@controllers/main/MainController';

const routes = Router();

const controller = new MainController();

/**
 * @apiDefine MultipartHeader
 *
 * @apiHeader {String="multipart/form-data"}  Content-Type  Request Mime-type
 * @apiHeader {String="https://*"} Origin     Origin URL
 */

/**
 * @apiDefine UnsupportedMediaType
 *
 * @apiErrorExample {json} 415
 * HTTP/1.1 415 Unsupported Media Type
 * {
 *  "error": {
 *    "name": "UnsupportedMediaTypeError",
 *    "message": "Invalid mimetype: \"text/css\", please try again later!",
 *    "details": {
 *      "mimetypes_supported": [
 *       "image/jpeg",
 *       "image/pjpeg",
 *       "image/png",
 *       "image/svg"
 *      ],
 *      "filename": "code.png",
 *      "supported_size": "3MB"
 *      "supported_size_bytes": 3145728
 *     }
 *    "status": 415,
 *   }
 * }
 */

/**
 * @api {get} /v1/ API version: 1
 * @apiVersion 1.0.0
 * @apiGroup Main
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    api: {
 *      version: "1.0.0",
 *      author: {
 *        name: "José Lucas",
 *        github: "lucasbernardol"
 *      },
 *      status: "working",
 *      repository: "https://github.com/lucasbernardol/cloudinary-uploads-api",
 *      timestamp: 1646580402
 *    }
 *  }
 */
routes.get('/', controller.handle);

export { routes as Main };
