/**
 * @interface IPagingOptions
 */
export interface IPagingOptions {
  page: number;
  limit: number;

  /**
   * @default true
   */
  setRange?: boolean;

  min?: number;
  max?: number;
}
