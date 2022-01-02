import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { User } from '../user/user.entity';
import { TagEntity } from '../tag/entities/tag.entity';
import { CommentEntity } from '../comment/entities/comment.entity';
import Category from '../category/category.entity';
import { CommentService } from '../comment/comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Article,
      User,
      TagEntity,
      Category,
      CommentEntity,
    ]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService, CommentService],
})
export class ArticleModule {}
