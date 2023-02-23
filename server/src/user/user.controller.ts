import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/libs/decorators/public.decorators';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get()
  findAll() {
    return 1;
  }
}
