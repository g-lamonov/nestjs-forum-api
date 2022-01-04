import { BadRequestException, Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleEntity } from './article.entity';
import slug = require('slug');
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { CoreApiResponse } from 'src/core/common/api/CoreApiResponse';
import { TagEntity } from '../tag/tag.entity';
import { CategoryEntity } from '../category/category.entity';
import { CommentEntity } from '../comment/comment.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,

    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,

    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async create(userId, createArticleDto: CreateArticleDto) {
    const { title, body, description, tags, categories } = createArticleDto;

    const article = new ArticleEntity();

    article.title = title;
    article.body = body;
    article.description = description;
    article.slug = this.slugify(title);

    if (tags) {
      const attr = [];
      for (const item of tags) {
        const tag = await this.tagRepository.findOne(item);
        if (!tag) {
          throw new BadRequestException(`Tag with id ${item} does not exist`);
        }
        attr.push(tag);
      }
      article.tags = attr;
    }

    if (categories) {
      const attr = [];
      for (const item of categories) {
        const category = await this.categoryRepository.findOne(item);
        if (!category) {
          throw new BadRequestException(
            `Category with id ${item} does not exist`,
          );
        }
        attr.push(category);
      }
      article.categories = attr;
    }

    const newArticle = await this.articleRepository.save(article);

    const author = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['articles'],
    });
    author.articles.push(article);

    await this.userRepository.save(author);

    return CoreApiResponse.success(newArticle);
  }

  async findAll(query) {
    const queryBuilder = await getRepository(ArticleEntity)
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.tags', 'tag')
      .leftJoinAndSelect('article.categories', 'category')
      .leftJoinAndSelect('article.author', 'author');

    queryBuilder.where('1 = 1');

    if ('author' in query) {
      const author = await this.userRepository.findOne({
        username: query.author,
      });
      queryBuilder.andWhere('article.authorId = :id', { id: author.id });
    }

    const count = await queryBuilder.getCount();

    if ('limit' in query) {
      queryBuilder.limit(query.limit);
    }

    if ('offset' in query) {
      queryBuilder.offset(query.offset);
    }

    queryBuilder.orderBy('article.createdAt', 'DESC');

    const articles = await queryBuilder.getMany();

    return CoreApiResponse.success({ count, articles });
  }

  async getCommentsInArticle(articleId: number, query) {
    const commentsQuery = await this.commentRepository
      .createQueryBuilder('comment')
      .limit(query.limit)
      .offset(query.offset)
      .orderBy('comment.createdAt', 'ASC')
      .leftJoin('comment.article', 'article')
      .andWhere('article.id = :id', { id: articleId });

    const count = await commentsQuery.getCount();
    const comments = await commentsQuery.getMany();

    return CoreApiResponse.success({ count, comments });
  }

  slugify(title: string) {
    return (
      slug(title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }
}
