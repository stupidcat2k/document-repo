import { TerminalDetail } from './terminal/entities/terminal-detail.entity';
import { Terminal } from './terminal/entities/terminal.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { TerminalModule } from './terminal/terminal.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456789',
      database: 'postgres',
      entities: [ User, Terminal, TerminalDetail ],
      synchronize:true,
      logging: true
    }),
    UserModule,
    AuthModule,
    TerminalModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
