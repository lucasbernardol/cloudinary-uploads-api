import { getCustomRepository } from 'typeorm';
import { BadRequest } from 'http-errors';

import { UploadRepositories } from '@repositories/UploadRepositories';
import { Id } from '@shared/interface/types/Id';

/**
 * @class FindUploadByIdService
 */
export class FindUploadByIdService {
  public constructor(
    private repositories = getCustomRepository(UploadRepositories)
  ) {}

  async execute(id: Id) {
    const convertIdInputToNumber = Number(id);

    /** @TODO Return a error message  */
    if (isNaN(convertIdInputToNumber)) {
      throw new BadRequest(`Invalid params: '${id}'`);
    }

    const upload = await this.repositories.findOne({
      where: {
        id: convertIdInputToNumber,
      },
    });

    return upload ?? null;
  }
}
