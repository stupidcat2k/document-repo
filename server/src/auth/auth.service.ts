import { LoginRequest, TokenPayload } from './dto';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userId: string): Promise<any> {
    try {
      if (!userId) {
        return null;
      }
      const user = await this.userService.findUser(userId, true);
      if (!user) {
        return null;
      }

      const { usrNm } = user;
      return {
        userId,
        usrNm,
      };
    } catch (error) {
      return null;
    }
  }

  async login(payload: LoginRequest): Promise<any> {
    const { username, password } = payload;
    const user = await this.userService.findUser(username, true);
    if (!user) {
      throw new BadRequestException('Username is incorrect or inactive');
    }
    if (user) {
      const accessToken = this.getAccessToken(username);
      const refreshToken = this.getRefreshToken(username);
      return {
        authUser: user,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    }
    return null;
  }

  getAccessToken(userId: string): string {
    const payload: TokenPayload = { userId };
    const { secret, expiresIn } = this.getAccessTokenConfig();
    const accessToken = this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });
    return accessToken;
  }

  getRefreshToken(userId: string): string {
    const payload: TokenPayload = { userId };
    const { secret, expiresIn } = this.getRefreshTokenConfig();
    const refreshToken = this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });
    return refreshToken;
  }

  getAccessTokenConfig() {
    const configService = new ConfigService();
    const expiresIn =
      configService.get('JWT_ACCESS_LIFETIME_MINUTES') * 60 * 1000;
    return {
      secret: configService.get('JWT_ACCESS_SECRET'),
      expiresIn: expiresIn.toString(),
    };
  }

  getRefreshTokenConfig() {
    const configService = new ConfigService();
    const expiresIn =
      configService.get('JWT_REFRESH_LIFETIME_MINUTES') * 60 * 1000;
    return {
      secret: configService.get('JWT_REFRESH_SECRET'),
      expiresIn: expiresIn.toString(),
    };
  }
}
