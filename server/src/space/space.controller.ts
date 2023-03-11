import { Param } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { UpdateSpaceDTO } from './dto/update-space.dto';
import { HttpStatus } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { SERVER_ERROR_MESSAGE } from 'src/libs/constants';
import { CurrentUser } from 'src/libs/decorators/current-user.decorator';
import { ResponseObject } from 'src/libs/response-object';
import { CreateSpaceDTO } from './dto/create-space.dto';
import { SpaceService } from './space.service';

@Controller('space')
export class SpaceController {
  constructor(private spaceService: SpaceService) {}

  @Get('select-space-by-status/:actFlg')
  async getAllSpaceByActFlg(
    @Param('actFlg') actFlg: boolean,
    @Res() res: Response,
  ) {
    try {
      const lstSpace = await this.spaceService.selectSpace(actFlg);
      return res.send(ResponseObject.success(lstSpace));
    } catch (e) {
      console.error(e);
      if (e instanceof NotFoundException) {
        return res.send(ResponseObject.fail(e.message));
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
    }
  }

  @Post('/create')
  async createSpace(
    @Body() createSpaceDTO: CreateSpaceDTO,
    @CurrentUser('userId') userId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.spaceService.createNewSpace(
        createSpaceDTO,
        userId,
      );
      return res.send(ResponseObject.success(result));
    } catch (error) {
      console.log(error);
      return res.send(ResponseObject.success(null));
    }
  }

  @Put('update')
  async updateSpace(
    @Body() updateSpaceDTO: UpdateSpaceDTO,
    @CurrentUser('userId') userId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.spaceService.updateSpace(
        updateSpaceDTO,
        userId,
      );
      return res.send(ResponseObject.success(result));
    } catch (error) {
      console.log(error);
      return res.send(ResponseObject.success(null));
    }
  }

  @Delete('delete-by-id/:id')
  async deleteSpace(
    @Param('id') id: string,
    @CurrentUser('userId') userId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.spaceService.deleteSpaceById(id, userId);
      return res.send(ResponseObject.success(result));
    } catch (e) {
      console.error(e);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
    }
  }

  @Delete('delete-permanent/:id')
  async deletePermanetSpace(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.spaceService.deleteSpacePermaById(id);
      return res.send(ResponseObject.success(result));
    } catch (e) {
      console.error(e);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
    }
  }
}
