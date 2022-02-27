import { OutPut, Constants } from 'paging-util';

export type PagingOutput = Partial<OutPut>;

export type PagingConstants = Partial<Constants>;

/**
 * @interface NormalizePagingUtil
 */
export interface NormalizePagingUtil {
  records: number;
  total_pages: number;
  current_page: number;
  first_page: number;
  limit: number;
  next: number;
  previous: number;
  has_next: boolean;
  has_previous: boolean;
  range: number[] | null;
  length: number;
}

export interface NormalizeConstants {
  min_limit: number;
  max_limit: number;
}

/**
 * @function normalize
 */
export function normalize(paging: PagingOutput): NormalizePagingUtil {
  return {
    records: paging.records,
    total_pages: paging.totalPages,
    current_page: paging.currentPage,
    first_page: paging.firstPage,

    limit: paging.limit,

    next: paging.next,
    previous: paging.previous,
    has_next: paging.hasNext,
    has_previous: paging.hasPrevious,

    range: paging.range,
    length: paging.length,
  };
}

/**
 * @function normalizeConstants
 */
export function normalizeConstants(
  constants: PagingConstants
): NormalizeConstants {
  return {
    min_limit: constants.MIN_LIMIT,
    max_limit: constants.MAX_LIMIT,
  };
}
