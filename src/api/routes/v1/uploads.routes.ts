import { Router } from 'express';
import multer from 'multer';

import { ListUploadsController } from '@controllers/uploads/ListUploadsController';
import { FindUploadByIdController } from '@controllers/uploads/FindUploadByIdController';

import { CreateUploadController } from '@controllers/uploads/CreateUploadController';
import { DeleteUploadController } from '@controllers/uploads/DeleteUploadController';

import { options } from '@config/uploader';

const routes = Router();

const multerHandle = multer(options);
const multerSigleUpload = multerHandle.single('file');

/** Controllers  */
const listController = new ListUploadsController();
const findController = new FindUploadByIdController();

const createController = new CreateUploadController();
const deleteController = new DeleteUploadController();

/** Routes  */
routes.get('/uploads', listController.handle);
routes.get('/uploads/:id', findController.handle);

routes.post('/uploads', multerSigleUpload, createController.handle);
routes.delete('/uploads/:id', deleteController.handle);

export { routes as uploadsRoutes };
