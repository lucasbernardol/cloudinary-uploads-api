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
  application_repository: string;
  status: Status;
  date: string | Date | number;
  [key: string]: any;
}
