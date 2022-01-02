import Category from 'src/modules/category/category.entity';
import { CommentEntity } from 'src/modules/comment/entities/comment.entity';
import { TagEntity } from 'src/modules/tag/entities/tag.entity';
import { User } from 'src/modules/user/user.entity';
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
export class Article {
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

  @ManyToOne(() => User, (user) => user.articles, { eager: true })
  author: User;

  @ManyToMany(type => TagEntity, type => type.articles, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
    nullable: true,
  })
  @JoinTable()
  tags: TagEntity[];

  @ManyToMany(() => Category, (category: Category) => category.articles, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  public categories?: Category[];

  @OneToMany(() => CommentEntity, (type) => type.article)
  comments: CommentEntity[];
}
