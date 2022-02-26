import { Router } from 'express';

import { MainController } from '@controllers/main/MainController';

import { uploadsRoutes } from './uploads.routes';

const routes = Router();

const controller = new MainController();

/**
 * @example: /api
 */
routes.get('/api', controller.handle);

/**
 * @example: /api/uploads
 */
routes.use('/api', uploadsRoutes);

export { routes };
