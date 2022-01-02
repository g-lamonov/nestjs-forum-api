import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Article } from '../article/entities/article.entity';
import { CommentEntity } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, Article])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
