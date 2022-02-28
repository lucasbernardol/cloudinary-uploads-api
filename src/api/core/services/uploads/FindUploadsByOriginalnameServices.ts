import { getCustomRepository, Like } from 'typeorm';
import * as Paging from 'paging-util';

import { UploadRepositories } from '@repositories/UploadRepositories';

import { IPagingOptions } from '@shared/interface/types/IPagingOptions';
import { Metadata } from '@shared/interface/types/IPagingMetadata';

import { IFindByOriginalnameDTO } from './dtos/IFindByOriginalnameDTO';
import { normalize, normalizeConstants } from '@shared/utils/paging';

/**
 * @class FindUploadsByOriginalnameServices
 */
export class FindUploadsByOriginalnameServices {
  public constructor(
    private repositories = getCustomRepository(UploadRepositories)
  ) {}

  async execute({ originalname }: IFindByOriginalnameDTO, ext: IPagingOptions) {
    const { setRange = true, ...extras } = ext;

    const totalPerPageLessThanTen = extras.limit < 10;

    /** ORM like string  */
    const like = `%${originalname}%`;

    const records = await this.repositories.count({
      where: { originalname: Like(like) },
    });

    const { offset, constants, ...paging } = Paging.paginate({
      records,
      ...extras,
      setRange: totalPerPageLessThanTen ? false : setRange,
    });

    const uploads = await this.repositories.find({
      where: { originalname: Like(like) },

      take: paging.limit,
      skip: offset,
    });

    /** @TODO pagination  */
    let metadata: Metadata;

    const totalRecordsGreaterThanOne = records >= 1;

    if (totalRecordsGreaterThanOne) {
      metadata = {
        pagination: normalize(paging),
        constants: normalizeConstants(constants),
      };
    }

    return {
      uploads: {
        uploads,
        metadata,
      },

      disabled: +totalPerPageLessThanTen,
    };
  }
}
