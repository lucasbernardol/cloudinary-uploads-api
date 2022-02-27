import { getCustomRepository } from 'typeorm';
import * as Paging from 'paging-util';

import { UploadRepositories } from '@repositories/UploadRepositories';

import { IPagingOptions } from '@shared/interface/types/IPagingOptions';

import {
  normalize,
  normalizeConstants,
  NormalizeConstants,
  NormalizePagingUtil,
} from '@shared/utils/paging';

export interface Metadata {
  pagination?: NormalizePagingUtil;
  constants?: NormalizeConstants;
}

/**
 * @class ListUploadsServices
 */
export class ListUploadsServices {
  public constructor(
    private repositories = getCustomRepository(UploadRepositories)
  ) {}

  async execute({ setRange = true, ...extras }: IPagingOptions) {
    const totalPerPageLessThanTen = extras.limit < 10;

    const records = await this.repositories.count();

    /** Merged options  */
    const mergedPaginationOptions = {
      records,
      ...extras,
    };

    const { offset, constants, ...paging } = Paging.paginate({
      ...mergedPaginationOptions,

      setRange: totalPerPageLessThanTen ? false : true, // pages[]
    });

    const uploads = await this.repositories.find({
      take: paging.limit,
      skip: offset,
    });

    let metadata: Metadata;

    const recordsTotalGreaterThanOne = records >= 1;

    /** @TODO pagination  */
    if (recordsTotalGreaterThanOne) {
      const parsed = {
        pagination: normalize(paging),
        constants: normalizeConstants(constants),
      };

      metadata = parsed;
    }

    return {
      uploads: {
        uploads,
        metadata,
      },

      /** Boolean => Number  */
      disabled: +totalPerPageLessThanTen,
    };
  }
}
