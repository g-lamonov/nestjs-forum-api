import { TableName } from 'src/core/common/enums/db.enums';
import { UserRole } from 'src/core/common/enums/UserEnums';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableUsers1641308543372 implements MigrationInterface {
  private usersTable: Table = new Table({
    name: TableName.User,
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
      },
      {
        name: 'username',
        type: 'varchar',
        isNullable: false,
        isUnique: true,
        length: '255',
      },
      {
        name: 'role',
        type: 'varchar',
        isNullable: false,
        length: '255',
        default: UserRole.User,
      },
      {
        name: 'password',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'salt',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'createdAt',
        type: 'timestamptz',
        default: 'now()',
      },
      {
        name: 'updatedAt',
        type: 'timestamptz',
        default: 'now()',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.usersTable, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.usersTable, true);
  }
}
