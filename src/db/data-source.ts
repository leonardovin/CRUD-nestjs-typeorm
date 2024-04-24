import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',

  host: process.env.DB_HOST || 'localhost',

  port: parseInt(process.env.DB_PORT) || 5432,

  username: process.env.DB_USERNAME || 'postgres',

  password: process.env.DB_PASSWORD,

  database: process.env.DB_DATABASE || 'nestjs-database',

  synchronize: true,

  migrations: [join(__dirname, '**', '*.entity.{ts,js}')],
};

const dataSource = new DataSource(dataSourceConfig);

export default dataSource;
