import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { ArticleEntity } from '../article/entities/article.entity';
import { CommentEntity } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, ArticleEntity])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
