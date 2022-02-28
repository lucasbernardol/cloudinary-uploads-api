import { NormalizeConstants, NormalizePagingUtil } from '@shared/utils/paging';

/**
 * @interface Metadata
 */
export interface Metadata {
  pagination?: NormalizePagingUtil;
  constants?: NormalizeConstants;
}
