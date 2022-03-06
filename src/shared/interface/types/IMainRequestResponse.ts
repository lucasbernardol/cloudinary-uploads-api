export type Status = 'working';

/**
 * @interface IMainRequestResponse
 */
export interface IMainRequestResponse {
  version: string;
  author: {
    name: string;
    github: string;
  };
  repository: string;
  status: Status;
  timestamp: string | Date | number;
}
