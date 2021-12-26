import { BadRequestException, Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entities/article.entity';
import slug = require('slug');
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { CoreApiResponse } from 'src/core/common/api/CoreApiResponse';
import { TagEntity } from '../tag/entities/tag.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async create(userId, createArticleDto: CreateArticleDto) {
    const { title, body, description, tags } = createArticleDto;

    const article = new Article();

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
    const queryBuilder = await getRepository(Article)
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.tags', 'tag')
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

  slugify(title: string) {
    return (
      slug(title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }
}
