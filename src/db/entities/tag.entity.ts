import { TableName } from 'src/core/common/enums/db.enums';
import { ArticleEntity } from 'src/db/entities/article.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity({ name: TableName.Tag })
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToMany(() => ArticleEntity, (article) => article.tags)
  articles: ArticleEntity[];
}
