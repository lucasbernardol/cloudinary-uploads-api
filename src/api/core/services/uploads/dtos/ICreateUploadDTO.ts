/**
 * @interface ICreateUploadDTO
 */
export interface ICreateUploadDTO {
  filename: string;
  mimetype: string;
  originalname: string;
  path: string;
  uploaded_by: string | null;
}
