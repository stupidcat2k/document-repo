import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport/dist';
import { RefreshTokenStrategy } from './stategy/refresh.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenStrategy } from './stategy/jwt.strategy';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({})],
  providers: [AuthService, JwtTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
