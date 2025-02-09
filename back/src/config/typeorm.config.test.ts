import { DataSource, DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5435,
  username: 'postgres',
  password: 'postgres',
  database: 'testdb',
  migrationsRun: true,
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  logging: process.env.NODE_ENV == 'dev',
  migrations: [`${__dirname}/../database/migrations/*{.ts,.js}`],
};

export const connectionSource = new DataSource(config as DataSourceOptions)
