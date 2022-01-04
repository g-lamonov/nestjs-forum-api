import { ForeignKey, TableName } from 'src/core/common/enums/db.enums';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableArticleTag1641313191286 implements MigrationInterface {
  private articleTagTable: Table = new Table({
    name: TableName.ArticleTag,
    columns: [
      {
        name: ForeignKey.ArticleId,
        type: 'integer',
        isNullable: false,
      },
      {
        name: ForeignKey.TagId,
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

  private tagId: TableForeignKey = new TableForeignKey({
    columnNames: [ForeignKey.TagId],
    referencedColumnNames: ['id'],
    referencedTableName: TableName.Tag,
    onDelete: 'CASCADE',
  });

  private tableForeignKeys: TableForeignKey[] = [this.articleId, this.tagId];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.articleTagTable, true);

    await queryRunner.createForeignKeys(
      TableName.ArticleTag,
      this.tableForeignKeys,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(
      TableName.ArticleTag,
      this.tableForeignKeys,
    );

    await queryRunner.dropTable(this.articleTagTable, true);
  }
}
