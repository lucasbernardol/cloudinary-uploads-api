import { Router } from 'express';
import multer from 'multer';

import { CreateUploadController } from '@controllers/uploads/CreateUploadController';

import { options } from '@config/uploader';

const routes = Router();

const multerHandle = multer(options);
const multerSigleUpload = multerHandle.single('file');

/** Controllers  */
const createController = new CreateUploadController();

/** Routes  */
routes.post('/uploads', multerSigleUpload, createController.handle);

export { routes as uploadsRoutes };
