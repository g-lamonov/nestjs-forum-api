import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleEntity } from '../article/entities/article.entity';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @ManyToMany(
    () => ArticleEntity,
    (article: ArticleEntity) => article.categories,
  )
  public articles: ArticleEntity[];
}
