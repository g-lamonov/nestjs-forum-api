import { TableName } from 'src/core/common/enums/db.enums';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleEntity } from './article.entity';

@Entity({ name: TableName.Category })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToMany(
    () => ArticleEntity,
    (article: ArticleEntity) => article.categories,
  )
  public articles: ArticleEntity[];
}
