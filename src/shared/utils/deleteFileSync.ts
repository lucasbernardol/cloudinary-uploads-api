import fileSystem from 'fs';

/**
 * @function deleteFileSync
 */
export function deleteFileSync(filePath: string): void {
  return fileSystem.unlinkSync(filePath);
}
