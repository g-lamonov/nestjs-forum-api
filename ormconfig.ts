module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/db/migrations/*.ts'],
  seeds: ['src/db/seeders/**/*{.ts,.js}'],
  factories: ['src/db/factories/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};
