import { NormalizeConstants, NormalizePagingUtil } from '@shared/utils/paging';

/**
 * @interface Metadata
 */
export interface IPagingMetadata {
  pagination?: NormalizePagingUtil;
  constants?: NormalizeConstants;
}
