import { FileModule } from './file/file.module';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import datasource, { typeormConfig } from './datasource/datasource';
import { SpaceModule } from './space/space.module';
import { DocModule } from './doc/doc.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => typeormConfig,
      dataSourceFactory: async () => {
        datasource.initialize();
        return datasource;
      },
    }),
    UserModule,
    AuthModule,
    FileModule,
    SpaceModule,
    DocModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
