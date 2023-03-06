import {
  Body,
  Controller, Get, Post
} from '@nestjs/common';
import { SERVER_ERROR_MESSAGE } from 'src/libs/constants';
import { CurrentUser } from 'src/libs/decorators/current-user.decorator';
import { ResponseObject } from 'src/libs/response-object';
import { CreateSpaceDto } from './dto/create-space.dto';
import { SpaceService } from './space.service';

@Controller('space')
export class SpaceController {
  constructor(private spaceService: SpaceService) {}

  @Get()
  async getAllSpace () {
    try {
      const lstSpace = await this.spaceService.selectActiveSpace();
      return ResponseObject.success(lstSpace);
    } catch (error) {
      console.log(error);
      return ResponseObject.fail(SERVER_ERROR_MESSAGE);
    }
  }

  @Post('/create')
  async createSpace (@Body() spaceDTO: CreateSpaceDto, @CurrentUser('userId') userId,) {
    try {
      
    } catch (error) {
      console.log(error);
      return ResponseObject.fail(SERVER_ERROR_MESSAGE);
    }
  }
}
