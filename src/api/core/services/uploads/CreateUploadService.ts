import { getCustomRepository } from 'typeorm';

import { UploadRepositories } from '@repositories/UploadRepositories';
import { createCludinaryProvider } from '@providers/CloudinaryProvider';

import { ICreateUploadDTO } from './dtos/ICreateUploadDTO';

/**
 * @class CreateUploadService
 */
export class CreateUploadService {
  public constructor(
    private repositories = getCustomRepository(UploadRepositories),
    private cloudinaryProvider = createCludinaryProvider()
  ) {}

  async execute(upload: ICreateUploadDTO) {
    const { filename, originalname, mimetype, path, uploaded_by } = upload;

    const cloudinary = await this.cloudinaryProvider.cloudinaryUploadFileHandle(
      path,
      { deleteFromLocalDisk: true }
    );

    /** Cloudinary info  */
    const { version, public_id, width, height, resource_type, secure_url } =
      cloudinary;

    const uploadObjectInstance = this.repositories.create({
      filename,
      originalname,
      mimetype,
      version,
      public_id,
      width,
      height,
      resource_type,
      secure_url,
      bytes: cloudinary.bytes,
      type: cloudinary.type,
      format: cloudinary.format,
      uploaded_by,
    });

    const uploaded = await this.repositories.save(uploadObjectInstance);

    /** Remove remote address  */
    delete uploaded['uploaded_by'];

    return uploaded;
  }
}
