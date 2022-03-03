import { getCustomRepository } from 'typeorm';
import { BadRequest } from 'http-errors';

import { Upload } from '@entities/Upload';
import { UploadRepositories } from '@repositories/UploadRepositories';

import { createCludinaryProvider } from '@providers/CloudinaryProvider';
import { Id } from '@shared/interface/types/Id';

import { IUpdateUploadDTO } from './dtos/IUpdateUploadDTO';

/**
 * @class UpdateUploadService
 */
export class UpdateUploadService {
  public constructor(
    private repositories = getCustomRepository(UploadRepositories),
    private cloudinaryProvider = createCludinaryProvider()
  ) {}

  private _keys: (keyof Upload)[] = ['id', 'public_id'];

  private isUploadConflict(upload: Upload): boolean {
    return !upload;
  }

  public get keys() {
    return this._keys;
  }

  async execute(
    id: Id,
    { filename, originalname, mimetype, path, updated_by }: IUpdateUploadDTO
  ) {
    const parsedUploadIdToInteger = Number(id);

    const uploadIntegerIdIsNaN = isNaN(parsedUploadIdToInteger);

    if (uploadIntegerIdIsNaN) throw new BadRequest(`Invalid params: ${id}`);

    const upload = await this.repositories.findOne({
      where: { id: parsedUploadIdToInteger },
      select: [...this.keys],
    });

    /**
     * @TODO validation upload!
     **/
    const isUploadedConflict = this.isUploadConflict(upload);

    if (isUploadedConflict) throw new BadRequest('Invalid upload!');

    const deletion = await this.cloudinaryProvider.cloudinaryDestroyFileHandle(
      upload.public_id
    );

    const cloudinary = await this.cloudinaryProvider.cloudinaryUploadFileHandle(
      path,
      { deleteFromLocalDisk: true }
    );

    const { version, public_id, width, height, resource_type, secure_url } =
      cloudinary;

    const updatedResultDatabase = await this.repositories.update(
      parsedUploadIdToInteger,
      {
        filename,
        mimetype,
        originalname,
        version,
        public_id,
        width,
        height,
        resource_type,
        secure_url,
        bytes: cloudinary.bytes,
        type: cloudinary.type,
        format: cloudinary.format,
        updated_by,
      }
    );

    return {
      removed: deletion,
      updated: Boolean(updatedResultDatabase.affected),
    };
  }
}
