import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';

export class Seeder1002Category implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(CategoryEntity)
      .values([{ id: 1, name: 'Movies' }])
      .execute();
  }
}
