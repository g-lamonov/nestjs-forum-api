import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { TagEntity } from '../entities/tag.entity';

export class Seeder1001Tag implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(TagEntity)
      .values([{ id: 1, name: 'CEO', color: '#111111', tag: 'tag' }])
      .execute();
  }
}
