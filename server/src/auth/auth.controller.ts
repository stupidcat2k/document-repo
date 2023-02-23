import { REFRESH_TOKEN_COOKIE_NAME } from './../libs/constants';
import { ResponseObject } from 'src/libs/dto/response-object.dto';
import { LoginRequest, AuthResponse } from './dto/';
import { AuthService } from './auth.service';
import { Public } from 'src/libs/decorators/public.decorators';
import {
  Controller,
  Res,
  Req,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(
    @Body() loginRequest: LoginRequest,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ): Promise<ResponseObject<AuthResponse>> {
    const loginResponse = await this.authService.login(loginRequest);
    const { accessToken: token, refreshToken, authUser } = loginResponse;
    const { expiresIn } = this.authService.getRefreshTokenConfig();
    this.addRefreshTokenCookie(res, req.secure, refreshToken, +expiresIn);
    return ResponseObject.success({
      authUser,
      token,
    });
  }

  private addRefreshTokenCookie(
    res: Response,
    isSecure: boolean,
    value: string,
    maxAge: number,
  ) {
    res.cookie(REFRESH_TOKEN_COOKIE_NAME, value, {
      maxAge: maxAge,
      path: '/',
      httpOnly: true,
      secure: isSecure,
    });
  }
}
