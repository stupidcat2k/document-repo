import { RolesGuard } from './roles.guard';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from './../user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'docs repo',
      signOptions: { expiresIn: '300s' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, 
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },]
})
export class AuthModule {}
