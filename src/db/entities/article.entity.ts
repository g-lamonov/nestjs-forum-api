import { ForeignKey, TableName } from 'src/core/common/enums/db.enums';
import { CategoryEntity } from 'src/db/entities/category.entity';
import { CommentEntity } from 'src/db/entities/comment.entity';
import { TagEntity } from 'src/db/entities/tag.entity';
import { UserEntity } from 'src/db/entities/user.entity';
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

@Entity({ name: TableName.Article })
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
  user: UserEntity;

  @ManyToMany(() => TagEntity, (type) => type.articles, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
    nullable: true,
  })
  @JoinTable({
    name: TableName.ArticleTag,
    joinColumn: {
      name: ForeignKey.ArticleId,
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: ForeignKey.TagId,
      referencedColumnName: 'id',
    },
  })
  tags: TagEntity[];

  @ManyToMany(
    () => CategoryEntity,
    (category: CategoryEntity) => category.articles,
    {
      eager: true,
      cascade: true,
    },
  )
  @JoinTable({
    name: TableName.ArticleCategory,
    joinColumn: {
      name: ForeignKey.ArticleId,
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: ForeignKey.CategoryId,
      referencedColumnName: 'id',
    },
  })
  public categories?: CategoryEntity[];

  @OneToMany(() => CommentEntity, (type) => type.article)
  comments: CommentEntity[];
}
