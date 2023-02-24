import { TokenPayload } from './../dto/token-payload.dto';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { REFRESH_TOKEN_COOKIE_NAME } from 'src/libs/constants';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.[REFRESH_TOKEN_COOKIE_NAME],
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_REFRESH_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    const { usrId } = payload;
    const user = await this.authService.validateUser(usrId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
