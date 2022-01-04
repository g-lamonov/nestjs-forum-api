import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/core/common/enums/UserEnums';

export class Seeder1004User implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash('password', salt);

    await connection
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([
        { username: 'user', role: UserRole.User, password, salt },
        { username: 'admin', role: UserRole.Admin, password, salt },
      ])
      .execute();
  }
}
