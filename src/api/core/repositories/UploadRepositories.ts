import { EntityRepository, Repository } from 'typeorm';

import { Upload } from '@entities/Upload';

@EntityRepository(Upload)
class UploadRepositories extends Repository<Upload> {}

export { UploadRepositories };
