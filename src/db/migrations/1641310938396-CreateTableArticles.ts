import { ForeignKey, TableName } from 'src/core/common/enums/db.enums';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableArticles1641310938396 implements MigrationInterface {
  private articlesTable: Table = new Table({
    name: TableName.Article,
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
      },
      {
        name: 'slug',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'title',
        type: 'varchar',
        isNullable: false,
        length: '255',
      },
      {
        name: 'description',
        type: 'varchar',
        isNullable: false,
        length: '255',
      },
      {
        name: 'body',
        type: 'text',
        isNullable: false,
      },
      {
        name: ForeignKey.UserId,
        type: 'integer',
        isNullable: true,
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

  private UserIdPK: TableForeignKey = new TableForeignKey({
    columnNames: [ForeignKey.UserId],
    referencedColumnNames: ['id'],
    referencedTableName: TableName.User,
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.articlesTable, true);

    await queryRunner.createForeignKey(TableName.Article, this.UserIdPK);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(TableName.Article, this.UserIdPK);

    await queryRunner.dropTable(this.articlesTable, true);
  }
}
