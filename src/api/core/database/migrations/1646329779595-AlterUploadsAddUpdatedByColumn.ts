import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUploadsAddUpdatedByColumn1646329779595
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const updatedBy = new TableColumn({
      name: 'updated_by',
      type: 'varchar',
      isNullable: true,
      default: null,
    });

    await queryRunner.addColumn('uploads', updatedBy);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('uploads', 'updated_by');
  }
}
