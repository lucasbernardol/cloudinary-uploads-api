import { getCustomRepository } from 'typeorm';
import * as Paging from 'paging-util';

import { UploadRepositories } from '@repositories/UploadRepositories';

import { normalize, normalizeConstants } from '@shared/utils/paging';

import { IPagingOptions } from '@shared/interface/types/IPagingOptions';
import { IPagingMetadata } from '@shared/interface/types/IPagingMetadata';

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
    const mergedPaginationOptions = { records, ...extras };

    const { offset, constants, ...paging } = Paging.paginate({
      ...mergedPaginationOptions,
      setRange: totalPerPageLessThanTen ? false : true, // pages[]
    });

    const uploads = await this.repositories.find({
      take: paging.limit,
      skip: offset,
    });

    let metadata: IPagingMetadata;

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
      uploads,

      disabled: +totalPerPageLessThanTen /** Boolean => Number  */,
      _meta: metadata,
    };
  }
}
