import { ForeignKey, TableName } from 'src/core/common/enums/db.enums';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableArticleCategory1641313197190
  implements MigrationInterface
{
  private articleCategoryTable: Table = new Table({
    name: TableName.ArticleCategory,
    columns: [
      {
        name: ForeignKey.ArticleId,
        type: 'integer',
        isNullable: false,
      },
      {
        name: ForeignKey.CategoryId,
        type: 'integer',
        isNullable: false,
      },
    ],
  });

  private articleId: TableForeignKey = new TableForeignKey({
    columnNames: [ForeignKey.ArticleId],
    referencedColumnNames: ['id'],
    referencedTableName: TableName.Article,
    onDelete: 'CASCADE',
  });

  private categoryId: TableForeignKey = new TableForeignKey({
    columnNames: [ForeignKey.CategoryId],
    referencedColumnNames: ['id'],
    referencedTableName: TableName.Category,
    onDelete: 'CASCADE',
  });

  private tableForeignKeys: TableForeignKey[] = [
    this.articleId,
    this.categoryId,
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.articleCategoryTable, true);

    await queryRunner.createForeignKeys(
      TableName.ArticleCategory,
      this.tableForeignKeys,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(
      TableName.ArticleCategory,
      this.tableForeignKeys,
    );

    await queryRunner.dropTable(this.articleCategoryTable, true);
  }
}
