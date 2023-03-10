import _ from 'lodash';
import { ConfigService } from '@nestjs/config';
import dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Domain, Space, User, AttachFile, Header } from 'src/entity';

dotenv.config({ path: './.env' });
const configService = new ConfigService();

export const typeormConfig: DataSourceOptions & TypeOrmModuleOptions = {
  entities: [User, AttachFile, Domain, Space, Header],
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: _.parseInt(configService.get('DB_PORT'), 10),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  logging: true,
  synchronize: false,
};

const datasource = new DataSource(typeormConfig);

export default datasource;
