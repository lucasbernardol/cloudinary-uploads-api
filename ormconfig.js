require('dotenv/config');

const isDevelopment = process.env.NODE_ENV === 'development';

const folder = isDevelopment ? 'src' : 'dist';

const typeORMExtrasOptions = {
  logging: false,
  synchronize: false,
};

module.exports = {
  ...typeORMExtrasOptions,

  type: process.env.DATABASE_TYPE || 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT) || 5432,

  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  entities: [`${folder}/api/core/entities/*{.ts,.js}`],

  migrationsTableName: 'migrations',
  migrations: [`${folder}/api/core/database/migrations/*{.ts,.js}`],

  cli: {
    migrationsDir: `${folder}/api/core/database/migrations`,
  },
};
