import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from '../article/entities/article.entity';

@Entity()
class Category {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @ManyToMany(() => Article, (article: Article) => article.categories)
  public articles: Article[];
}

export default Category;
