import { getCustomRepository } from 'typeorm';
import { BadRequest } from 'http-errors';

import {
  createCludinaryProvider,
  CloudinaryDestroyOutput,
} from '@providers/CloudinaryProvider';

import { UploadRepositories } from '@repositories/UploadRepositories';
import { Id } from '@shared/interface/types/Id';

/**
 * @interface Result
 */
export interface Result {
  destroyed: CloudinaryDestroyOutput;
  deleted: boolean;
}

/**
 * @class DeleteUploadService
 */
export class DeleteUploadService {
  public constructor(
    private repositories = getCustomRepository(UploadRepositories),
    private cloudinaryProvider = createCludinaryProvider()
  ) {}

  async execute(uploadId: Id): Promise<Result> {
    const uploadIdInputParseNumber = Number(uploadId);

    /** @TODO validate ID  */
    if (isNaN(uploadIdInputParseNumber)) {
      throw new BadRequest(`Invalid param: "${uploadId}"`);
    }

    const upload = await this.repositories.findOne({
      where: {
        id: uploadId,
      },
      select: ['id', 'public_id'],
    });

    if (!upload) throw new BadRequest('Invalid upload!');

    /** @TODO Cloudinary destroy  */
    const destroy = await this.cloudinaryProvider.cloudinaryDestroyFileHandle(
      upload.public_id,
      { deleteFromLocalDisk: false }
    );

    const deletion = await this.repositories.delete(uploadId);

    return {
      destroyed: destroy,
      deleted: Boolean(deletion.affected),
    };
  }
}
