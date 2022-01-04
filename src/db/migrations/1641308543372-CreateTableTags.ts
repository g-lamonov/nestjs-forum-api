import { TableName } from 'src/core/common/enums/db.enums';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableTags1641311247309 implements MigrationInterface {
  private tagsTable: Table = new Table({
    name: TableName.Tag,
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
        name: 'color',
        type: 'varchar',
        isNullable: false,
        length: '255',
      },
      {
        name: 'tag',
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
    await queryRunner.createTable(this.tagsTable, true);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tagsTable, true);
  }
}
