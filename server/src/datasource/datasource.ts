import _ from 'lodash';
import dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

dotenv.config({ path: './.env' });
const configService = new ConfigService();

export const typeormConfig: DataSourceOptions & TypeOrmModuleOptions = {
  entities: [__dirname + '/../entity/*{.ts,.js}'],
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: _.parseInt(configService.get('DB_PORT'), 10),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  logging: true,
  synchronize: true,
};

const datasource = new DataSource(typeormConfig);

export default datasource;
