import { AuthController } from './auth.controller';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokenStrategy } from './stategy/refresh.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenStrategy } from './stategy/jwt.strategy';

@Module({
  imports: [UserModule, JwtModule.register({})],
  providers: [AuthService, JwtTokenStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
