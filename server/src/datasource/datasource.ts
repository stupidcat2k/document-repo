import _ from 'lodash';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { configService } from 'src/libs/config/config.service';


export const typeormConfig: DataSourceOptions & TypeOrmModuleOptions = {
  entities: [__dirname + '/../entity/*{.ts,.js}'],
  type: 'postgres',
  host: configService.getValue('DB_HOST'),
  port: _.parseInt(configService.getValue('DB_PORT'), 10),
  username: configService.getValue('DB_HOST'),
  password: configService.getValue('DB_PASSWORD'),
  database: configService.getValue('DB_DATABASE'),
  logging: true,
  synchronize: true,
};

const datasource = new DataSource(typeormConfig);

export default datasource;
