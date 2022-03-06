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

const single = multerHandle.single('file');

/** Controllers  */
const listController = new ListUploadsController();
const findController = new FindUploadByIdController();

const findByNameController = new FindUploadsByOriginalnameController();
const createController = new CreateUploadController();

const deleteController = new DeleteUploadController();
const updateController = new UpdateUploadController();

/**
 * @api {get} /v1/uploads List upload(s)
 * @apiDescription List all uploads!
 * @apiVersion 1.0.0
 * @apiGroup Upload
 * @apiParam  {Number{1-}}         [page=1]     Current page
 * @apiParam  {Number{1-100}}      [limit=1]    Uploads per page
 *
 *
 * @apiSuccess (200 OK) {Upload[]}     upload                Upload array
 * @apiSuccess (200 OK) {Number}       upload.id             Upload ID
 * @apiSuccess (200 OK) {String}       upload.public_id      Cloudinary public ID
 * @apiSuccess (200 OK) {Number}       upload.version        Cloudinary upload version
 * @apiSuccess (200 OK) {String}       upload.filename       Upload filename
 * @apiSuccess (200 OK) {String}       upload.originalname   Upload original filename
 * @apiSuccess (200 OK) {String}       upload.mimetype       Upload mimetype
 * @apiSuccess (200 OK) {String}       upload.secure_url     Upload URL
 * @apiSuccess (200 OK) {Number}       upload.width          Upload width
 * @apiSuccess (200 OK) {Number}       upload.height         Upload height
 * @apiSuccess (200 OK) {Number}       upload.bytes          Upload bytes
 * @apiSuccess (200 OK) {String}       upload.format         Upload format
 * @apiSuccess (200 OK) {String}       upload.type           Upload type
 * @apiSuccess (200 OK) {String}       upload.resource_type  Upload resource type
 * @apiSuccess (200 OK) {Date}         upload.created_at     Upload create timestamp
 * @apiSuccess (200 OK) {Date}         upload.updated_at     Upload update timestamp
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "uploads": [
 *    {
 *      "id": 36,
 *      "version": 1646061170,
 *      "public_id": "public_uploads/wh2kayoscdpyc5u5pacr",
 *      "filename": "1281e987126991ec00bf46748504327755fb294d.jpg",
 *      "originalname": "programming.jpg",
 *      "mimetype": "image/jpeg",
 *      "secure_url": "https://res.cloudinary.com/dwmdtblrz/image/upload/v1646061170/public_uploads/wh2kayoscdpyc5u5pacr.jpg",
 *      "width": 2400,
 *      "height": 1856,
 *      "bytes": 588880,
 *      "resource_type": "image",
 *      "type": "upload",
 *      "format": "jpg",
 *      "created_at": "2022-02-28T15:12:51.439Z",
 *      "updated_at": "2022-02-28T15:12:51.439Z"
 *    },
 *  ]
 * }
 */
routes.get('/uploads', listController.handle);

/**
 * @api {get} /v1/uploads/:id Find a single upload
 * @apiDescription Get a single upload by: ID
 * @apiVersion 1.0.0
 * @apiGroup Upload
 * @apiParam  {Number}     [id=36]     Upload ID
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "id": 36,
 *    "version": 1646061170,
 *    "public_id": "public_uploads/wh2kayoscdpyc5u5pacr",
 *    "filename": "1281e987126991ec00bf46748504327755fb294d.jpg",
 *    "originalname": "programming.jpg",
 *    "mimetype": "image/jpeg",
 *    "secure_url": "https://res.cloudinary.com/dwmdtblrz/image/upload/v1646061170/public_uploads/wh2kayoscdpyc5u5pacr.jpg",
 *    "width": 2400,
 *    "height": 1856,
 *    "bytes": 588880,
 *    "resource_type": "image",
 *    "type": "upload",
 *    "format": "jpg",
 *    "created_at": "2022-02-28T15:12:51.439Z",
 *    "updated_at": "2022-02-28T15:12:51.439Z"
 *  },
 */
routes.get('/uploads/:id', findController.handle);

/**
 * @api {get} /v1/uploads/name/:originalfilename List uploads by filename
 * @apiDescription List by filename
 * @apiVersion 1.0.0
 * @apiGroup Upload
 *
 * @apiParam  {Number{1-}}         [page=1]     Current page
 * @apiParam  {Number{1-100}}      [limit=1]    Uploads per page
 * @apiParam  {Number{1-100}}      [originalfilename=programming]  Upload filename
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "uploads": [
 *    {
 *      "id": 36,
 *      "version": 1646061170,
 *      "public_id": "public_uploads/wh2kayoscdpyc5u5pacr",
 *      "filename": "1281e987126991ec00bf46748504327755fb294d.jpg",
 *      "originalname": "programming.jpg",
 *      "mimetype": "image/jpeg",
 *      "secure_url": "https://res.cloudinary.com/dwmdtblrz/image/upload/v1646061170/public_uploads/wh2kayoscdpyc5u5pacr.jpg",
 *      "width": 2400,
 *      "height": 1856,
 *      "bytes": 588880,
 *      "resource_type": "image",
 *      "type": "upload",
 *      "format": "jpg",
 *      "created_at": "2022-02-28T15:12:51.439Z",
 *      "updated_at": "2022-02-28T15:12:51.439Z"
 *    },
 *  ]
 * }
 */
routes.get('/uploads/name/:originalname', findByNameController.handle);

const createUploadLimiter = createLimiter({ windowMs: 300000, max: 20 });

/**
 * @api {post} /v1/uploads Create upload(s)
 * @apiDescription Create a single upload!
 * @apiVersion 1.0.0
 * @apiGroup Upload
 *
 * @apiUse MultipartHeader
 * @apiParam {FormData} file Image to upload
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "id": 36,
 *    "version": 1646061170,
 *    "public_id": "public_uploads/wh2kayoscdpyc5u5pacr",
 *    "filename": "1281e987126991ec00bf46748504327755fb294d.jpg",
 *    "originalname": "programming.jpg",
 *    "mimetype": "image/jpeg",
 *    "secure_url": "https://res.cloudinary.com/dwmdtblrz/image/upload/v1646061170/public_uploads/wh2kayoscdpyc5u5pacr.jpg",
 *    "width": 2400,
 *    "height": 1856,
 *    "bytes": 588880,
 *    "resource_type": "image",
 *    "type": "upload",
 *    "format": "jpg",
 *    "created_at": "2022-02-28T15:12:51.439Z",
 *    "updated_at": "2022-02-28T15:12:51.439Z"
 *  },
 *
 * @apiError (415 Unsupported Media Type)  UnsupportedMediaTypeError Invalid mimetypes
 * @apiUse UnsupportedMediaType
 */
routes.post('/uploads', createUploadLimiter, single, createController.handle);

const baseMinuteslimiter = createLimiter({ windowMs: 120000, max: 20 });

/**
 * @api {put} /v1/uploads/:id Update upload(s)
 * @apiDescription Update upload/image
 * @apiVersion 1.0.0
 * @apiGroup Upload
 *
 * @apiUse MultipartHeader
 * @apiParam {FormData} file  Image/file to update!
 *
 * @apiParam  {Number}      [id=32]     Upload ID
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "cloudinary": {
 *     "result": "ok"
 *    },
 *    "updated": true
 *  },
 */
routes.put('/uploads/:id', baseMinuteslimiter, single, updateController.handle);

/**
 * @api {delete} /v1/uploads/:id Delete upload(s)
 * @apiDescription Delete by ID
 * @apiVersion 1.0.0
 * @apiGroup Upload
 *
 * @apiParam  {Number}   [id=32]   Upload ID
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "cloudinary": {
 *     "result": "ok"
 *    },
 *    "deleted": true
 *  },
 */
routes.delete('/uploads/:id', baseMinuteslimiter, deleteController.handle);

export { routes as Upload };
