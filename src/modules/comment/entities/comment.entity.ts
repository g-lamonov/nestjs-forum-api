import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from 'src/modules/article/entities/article.entity';
import { User } from 'src/modules/user/user.entity';

@Entity('comment')
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    default: false,
  })
  isDelete: boolean;

  @Column('text')
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Article, (type) => type.comments, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  article: Article;

  @ManyToOne(() => User, (user: User) => user.articles)
  public author: User;
}
