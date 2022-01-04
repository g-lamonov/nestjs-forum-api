import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '../../db/entities/article.entity';
import { UserEntity } from '../../db/entities/user.entity';
import { TagEntity } from '../../db/entities/tag.entity';
import { CommentEntity } from '../../db/entities/comment.entity';
import { CategoryEntity } from '../../db/entities/category.entity';
import { CommentService } from '../comment/comment.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
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
