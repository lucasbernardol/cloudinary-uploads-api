import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUploadsAddIp1646052305895 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const uploadedBy = new TableColumn({
      name: 'uploaded_by',
      type: 'varchar',
      isNullable: true,
      default: null,
    });

    await queryRunner.addColumn('uploads', uploadedBy);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('uploads', 'uploaded_by');
  }
}
