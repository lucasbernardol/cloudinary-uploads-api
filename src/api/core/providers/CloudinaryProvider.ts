import cloudinary, { UploadApiOptions } from 'cloudinary';

import { deleteFileSync } from '@shared/utils/deleteFileSync';
import env from '@config/env';

const cloudinaryProviderClient = cloudinary.v2;

const cloudinaryEnvConfig = env.cloudinary;

/** Add cloudinary config */
cloudinaryProviderClient.config({
  cloud_name: cloudinaryEnvConfig.cloudinaryName,
  api_key: cloudinaryEnvConfig.cloudinaryKey,
  api_secret: cloudinaryEnvConfig.cloudinarySecret,
});

/**
 * @interface CloudinaryHandleOptions
 */
export interface CloudinaryHandleOptions {
  deleteFromLocalDisk: boolean;
  filePathToRemove?: string;
}

export interface CloudinaryDestroyOptions {
  resource_type?: string;
  type?: string;
  invalidate?: boolean;
}

/**
 * @interface CloudinaryDestroyOutput
 */
export interface CloudinaryDestroyOutput {
  result: string;
}

/**
 * @class CloudinaryProvider
 */
class CloudinaryProvider {
  private static instance: CloudinaryProvider;

  private cloudinaryClient = cloudinaryProviderClient;

  private cloudinaryUploadsFolder: string = 'public_uploads';

  /** @private constructor */
  private constructor() {}

  public static getInstance(): CloudinaryProvider {
    const hasNotCloudinaryClassInstance = !this.instance;

    if (hasNotCloudinaryClassInstance) {
      this.instance = new CloudinaryProvider();
    }

    return this.instance;
  }

  /**
   * - Get uploads directory
   * @default: "public_uploads"
   */
  public get folder(): string {
    return this.cloudinaryUploadsFolder;
  }

  public set folder(clodinaryFolderName: string) {
    const setInputIsString = typeof clodinaryFolderName === 'string';

    if (clodinaryFolderName && setInputIsString) {
      this.cloudinaryUploadsFolder = clodinaryFolderName;
    }
  }

  async cloudinaryUploadFileHandle(
    filePath: string,
    { deleteFromLocalDisk }: CloudinaryHandleOptions,
    extras: UploadApiOptions = {}
  ) {
    const folder = this.folder;

    const mergedUploadApiOptions: UploadApiOptions = { folder, ...extras };

    const cloudinaryUploaded = await this.cloudinaryClient.uploader.upload(
      filePath,
      mergedUploadApiOptions
    );

    /** @TODO Remove file from local disk  */
    if (deleteFromLocalDisk) {
      deleteFileSync(filePath);
    }

    return cloudinaryUploaded;
  }

  async cloudinaryDestroyFileHandle(
    publicId: string,
    options: Partial<CloudinaryHandleOptions> = {},
    extras: CloudinaryDestroyOptions = {}
  ): Promise<CloudinaryDestroyOutput> {
    const { deleteFromLocalDisk = false, filePathToRemove } = options;

    /** Remove: `localdisk`  */
    if (deleteFromLocalDisk) {
      const isString = typeof filePathToRemove === 'string';

      isString ? deleteFileSync(filePathToRemove) : null;
    }

    const mergedDestroyOptions = { ...extras };

    const cloudinaryDeletion = await this.cloudinaryClient.uploader.destroy(
      publicId,
      mergedDestroyOptions
    );

    return cloudinaryDeletion;
  }
}

function createCludinaryProvider(): CloudinaryProvider {
  return CloudinaryProvider.getInstance();
}

export {
  CloudinaryProvider,
  cloudinaryProviderClient,
  createCludinaryProvider,
};
