import { CategoryEntity } from 'src/modules/category/category.entity';
import { CommentEntity } from 'src/modules/comment/comment.entity';
import { TagEntity } from 'src/modules/tag/tag.entity';
import { UserEntity } from 'src/modules/user/user.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'articles' })
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  body: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @ManyToOne(() => UserEntity, (user) => user.articles, { eager: true })
  author: UserEntity;

  @ManyToMany(() => TagEntity, (type) => type.articles, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
    nullable: true,
  })
  @JoinTable()
  tags: TagEntity[];

  @ManyToMany(
    () => CategoryEntity,
    (category: CategoryEntity) => category.articles,
    {
      eager: true,
      cascade: true,
    },
  )
  @JoinTable()
  public categories?: CategoryEntity[];

  @OneToMany(() => CommentEntity, (type) => type.article)
  comments: CommentEntity[];
}
