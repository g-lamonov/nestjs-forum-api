import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { UserEntity } from '../user/user.entity';
import { TagEntity } from '../tag/tag.entity';
import { CommentEntity } from '../comment/comment.entity';
import { CategoryEntity } from '../category/category.entity';
import { CommentService } from '../comment/comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArticleEntity,
      UserEntity,
      TagEntity,
      CategoryEntity,
      CommentEntity,
    ]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService, CommentService],
})
export class ArticleModule {}
