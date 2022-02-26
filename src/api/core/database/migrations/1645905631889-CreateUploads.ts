import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUploads1645905631889 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const uploads = new Table({
      name: 'uploads',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },

        {
          name: 'version',
          type: 'int',
          isNullable: false,
        },

        {
          name: 'public_id',
          type: 'varchar',
          isNullable: false,
        },

        {
          name: 'filename',
          type: 'varchar',
          isNullable: false,
        },

        {
          name: 'mimetype',
          type: 'varchar',
          isNullable: false,
        },

        {
          name: 'originalname',
          type: 'varchar',
          isNullable: false,
        },

        {
          name: 'secure_url',
          type: 'varchar',
          isNullable: false,
        },

        {
          name: 'width',
          type: 'int',
          isNullable: false,
        },

        {
          name: 'height',
          type: 'int',
          isNullable: false,
        },

        {
          name: 'bytes',
          type: 'int',
          isNullable: false,
        },

        {
          name: 'resource_type',
          type: 'varchar',
          isNullable: false,
        },

        {
          name: 'type',
          type: 'varchar',
          length: '32',
          isNullable: false,
        },

        {
          name: 'format',
          type: 'varchar',
          length: '32',
          isNullable: false,
        },

        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },

        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
    });

    await queryRunner.createTable(uploads);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('uploads');
  }
}
