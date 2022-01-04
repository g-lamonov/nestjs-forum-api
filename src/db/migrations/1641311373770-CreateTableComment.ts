import { ForeignKey, TableName } from 'src/core/common/enums/db.enums';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableComment1641311373770 implements MigrationInterface {
  private commentsTable: Table = new Table({
    name: TableName.Comment,
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
      },
      {
        name: 'isDelete',
        type: 'bool',
        isNullable: false,
        default: false,
      },
      {
        name: 'content',
        type: 'text',
        isNullable: false,
      },
      {
        name: ForeignKey.ArticleId,
        type: 'integer',
        isNullable: true,
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

  private articleIdPK: TableForeignKey = new TableForeignKey({
    columnNames: [ForeignKey.ArticleId],
    referencedColumnNames: ['id'],
    referencedTableName: TableName.Article,
    onDelete: 'CASCADE',
  });

  private userIdPK: TableForeignKey = new TableForeignKey({
    columnNames: [ForeignKey.UserId],
    referencedColumnNames: ['id'],
    referencedTableName: TableName.User,
    onDelete: 'CASCADE',
  });

  private tableForeignKeys: TableForeignKey[] = [
    this.articleIdPK,
    this.userIdPK,
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.commentsTable, true);

    await queryRunner.createForeignKeys(
      TableName.Comment,
      this.tableForeignKeys,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(TableName.Comment, this.tableForeignKeys);

    await queryRunner.dropTable(this.commentsTable, true);
  }
}
