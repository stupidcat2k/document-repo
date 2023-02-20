import { LocalAuthGuard } from './local-auth.guard';
import { UpdateUserDto } from './../user/dto/update-user.dto';
import { Body, Controller, Post, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Role } from './role.enum';
import { Roles } from './roles.decorator';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor( 
    private authService: AuthService,
    private userService: UserService
    ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() req){
    return this.authService.login(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req){
    return req.user;
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('roles')
  @Roles(Role.Admin)
  update(@Body() updateUserDto:UpdateUserDto){
    return this.userService.updateUser(updateUserDto);
  }
}