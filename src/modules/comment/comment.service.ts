import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common/exceptions';

import { CommentEntity } from '../../db/entities/comment.entity';
import { ArticleEntity } from '../../db/entities/article.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UserEntity } from '../../db/entities/user.entity';
import { CoreApiResponse } from 'src/core/common/api/CoreApiResponse';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async createComment(user: UserEntity, createCommentDto: CreateCommentDto) {
    const comment = new CommentEntity();

    const article = await this.articleRepository.findOne(
      createCommentDto.articleId,
    );

    comment.user = user;

    if (!article) {
      throw new BadRequestException(
        `The article with id ${createCommentDto.articleId} does not exist`,
      );
    }

    comment.content = createCommentDto.content;
    comment.article = article;

    this.articleRepository.save(article);

    const createdComment = await this.commentRepository.save(comment);

    return CoreApiResponse.success(createdComment);
  }

  async updateComment(id: string, dto: UpdateCommentDto) {
    const comment = await this.commentRepository.findOne(id);
    if (!comment) {
      throw new BadRequestException(`The comment with id ${id} does not exist`);
    }

    comment.content = dto.content;
    const updatedComment = await this.commentRepository.save(comment);

    return CoreApiResponse.success(updatedComment);
  }

  async delete(ids: number[]) {
    const deleteIds = await Promise.all(
      ids.map(async (id) => {
        const comment = await this.commentRepository.findOne(id, {
          relations: ['article'],
        });

        if (!comment) {
          throw new BadRequestException(`Can't find the id for ${id} comments`);
        }

        await this.articleRepository.save(comment.article);
        return id;
      }),
    );

    await this.commentRepository.delete(deleteIds);

    return CoreApiResponse.success();
  }

  async softDelete(ids: number[]) {
    Promise.all(
      ids.map(async (commentId) => {
        const comment = await this.commentRepository.findOne(commentId);
        comment.isDelete = true;
        await this.commentRepository.save(comment);
      }),
    );

    return CoreApiResponse.success();
  }
}
