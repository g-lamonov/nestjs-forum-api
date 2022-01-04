import { ArticleEntity } from 'src/modules/article/article.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity('tag')
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 32,
  })
  name: string;

  @Column({
    length: 32,
    nullable: true,
  })
  color: string;

  @Column()
  tag: string;

  @ManyToMany(() => ArticleEntity, (article) => article.tags)
  articles: ArticleEntity[];
}
