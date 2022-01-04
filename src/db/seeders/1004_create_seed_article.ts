import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { ArticleEntity } from '../entities/article.entity';

export class Seeder1004Article implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(ArticleEntity)
      .values([{ slug: '', title: '', description: '', body: '' }])
      .execute();
  }
}
