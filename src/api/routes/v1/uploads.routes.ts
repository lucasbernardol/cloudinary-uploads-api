import { Router } from 'express';
import multer from 'multer';

import { ListUploadsController } from '@controllers/uploads/ListUploadsController';
import { FindUploadByIdController } from '@controllers/uploads/FindUploadByIdController';

import { FindUploadsByOriginalnameController } from '@controllers/uploads/FindUploadsByOriginalnameController';
import { CreateUploadController } from '@controllers/uploads/CreateUploadController';

import { UpdateUploadController } from '@controllers/uploads/UpdateUploadController';
import { DeleteUploadController } from '@controllers/uploads/DeleteUploadController';

import { createLimiter } from '@middlewares/limiter';
import { options } from '@config/uploader';

const routes = Router();

const multerHandle = multer(options);

const multerSigleUpload = multerHandle.single('file');

/** Controllers  */
const listController = new ListUploadsController();
const findController = new FindUploadByIdController();

const findByNameController = new FindUploadsByOriginalnameController();

const createController = new CreateUploadController();
const deleteController = new DeleteUploadController();
const updateController = new UpdateUploadController();

/** Routes  */
routes.get('/uploads', listController.handle);
routes.get('/uploads/:id', findController.handle);
routes.get('/uploads/name/:originalname', findByNameController.handle);

/**
 * - 5 minutes to ms
 *  (5 * 60) * 1000 = 300 * 1000 = 3 * 1000000 = 300000ms
 */
const createUploadLimiter = createLimiter({
  windowMs: 300000,
  max: 20,
});

routes.post(
  '/uploads',
  createUploadLimiter,
  multerSigleUpload,
  createController.handle
);

/**
 *  2 minutes => 10 requests
 */
const updateUploadLimiter = createLimiter({
  windowMs: 120000,
  max: 10,
});

routes.put(
  '/uploads/:id',
  updateUploadLimiter,
  multerSigleUpload,
  updateController.handle
);

/**
 *  2 minutes => 20 requests
 */
const deleteUploadLimiter = createLimiter({
  windowMs: 120000,
  max: 20,
});

routes.delete('/uploads/:id', deleteUploadLimiter, deleteController.handle);

export { routes as uploadsRoutes };
