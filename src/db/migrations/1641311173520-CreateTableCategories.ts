import { TableName } from 'src/core/common/enums/db.enums';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableCategories1641311173520 implements MigrationInterface {
  private categoriesTable: Table = new Table({
    name: TableName.Category,
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
      },
      {
        name: 'name',
        type: 'varchar',
        isNullable: false,
        length: '255',
      },
      {
        name: 'createdAt',
        type: 'timestamptz',
        default: 'now()',
      },
      {
        name: 'updatedAt',
        type: 'timestamptz',
        default: 'now()',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.categoriesTable, true);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.categoriesTable, true);
  }
}
