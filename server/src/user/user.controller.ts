import { SERVER_ERROR_MESSAGE } from 'src/libs/constants';
import { Body, Controller, Get, HttpStatus, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { ResponseObject } from 'src/libs/response-object';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { CurrentUser } from 'src/libs/decorators/current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUser(
    @Res() res: Response,
  ) {
    try {
      const lstSpace = await this.userService.findAll();
      return res.send(ResponseObject.success(lstSpace));
    } catch (e) {
      console.error(e);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
    }
  }

  @Post()
  async create(@Body() createUserDTO: CreateUserDto, @CurrentUser('userId') userId, @Res() res: Response,){
    try {
      const result = await this.userService.create(createUserDTO,userId);
      return res.send(ResponseObject.success(result));
    } catch (e) {
      console.error(e);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
    }
  }

  @Put('/update-user')
  async ChangeStatusRole(@Body() updateUserDTO: UpdateUserDTO, @CurrentUser('userId') userId, @Res() res: Response,){
    try {
      const result = await this.userService.updateUser(updateUserDTO,userId);
      return res.send(ResponseObject.success(result));
    } catch (e) {
      console.error(e);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
    }
  }
}
