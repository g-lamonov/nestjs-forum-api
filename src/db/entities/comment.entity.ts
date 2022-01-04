import { TableName } from 'src/core/common/enums/db.enums';
import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArticleEntity } from 'src/db/entities/article.entity';
import { UserEntity } from 'src/db/entities/user.entity';

@Entity({ name: TableName.Comment })
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

  @ManyToOne(() => ArticleEntity, (type) => type.comments, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  article: ArticleEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.articles)
  public user: UserEntity;
}
