import { Router } from 'express';

import { Main } from './main.routes';
import { Upload } from './uploads.routes';

const routes = Router();

/**
 * @example: http://localhost:3333/api/v1
 */
routes.use('/api/v1', Main);

/**
 * @example: http://localhost:3333/api/v1/uploads
 */
routes.use('/api/v1', Upload);

export { routes };
