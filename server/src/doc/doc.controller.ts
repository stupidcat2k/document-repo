import { CreateDocDTO } from './dto/create-doc.dto';
import { ResponseObject } from '../libs/response-object';
import { DocService } from './doc.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { SERVER_ERROR_MESSAGE } from 'src/libs/constants';
import { CurrentUser } from 'src/libs/decorators/current-user.decorator';
import { UpdateDocDTO } from './dto/update-doc.dto';
import { UpdateDocNameDTO } from './dto/update-doc-name.dto';

@Controller('doc')
export class DocController {
  constructor(private docService: DocService) {}

  @Post('create')
  async createDoc(
    @Body() createDocDTO: CreateDocDTO,
    @Res() res: Response,
    @CurrentUser('userId') userId,
  ) {
    try {
      const result = await this.docService.createDoc(createDocDTO, userId);
      return res.send(ResponseObject.success(result));
    } catch (e) {
      console.error(e);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
    }
  }

  @Get(':id/:actFlg')
  async findAllDocsBySpcId(
    @Param('id') id: string,
    @Param('actFlg') actFlg: boolean,
    @Res() res: Response,
  ) {
    try {
      const result = await this.docService.getAllDocsBySpcId(id, actFlg);
      return res.send(ResponseObject.success(result));
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

  @Get(':id/')
  async findDocDetails(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.docService.getDocDetailHdrId(id);
      return res.send(ResponseObject.success(result));
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
  @Put('update-doc-name')
  async updateDocName(
    @Body() updateDocNameDTO: UpdateDocNameDTO,
    @Res() res: Response,
    @CurrentUser('userId') userId,
  ) {
    try {
      const result = await this.docService.updateDocName(updateDocNameDTO, userId);
      return res.send(ResponseObject.success(result));
    } catch (e) {
      console.error(e);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
    }
  }

  @Put('update-doc-details')
  async updateDocDetail(
    @Body() updateDocDTO: UpdateDocDTO,
    @Res() res: Response,
    @CurrentUser('userId') userId,
  ) {
    try {
      const result = await this.docService.updateDocDetails(updateDocDTO, userId);
      return res.send(ResponseObject.success(result));
    } catch (e) {
      console.error(e);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
    }
  }


  @Delete('delete-by-id/:id')
  async deleteDoc(
    @Param('id') id: string,
    @Res() res: Response,
    @CurrentUser('userId') userId,
  ) {
    try {
      const result = await this.docService.deleteDocById(id, userId);
      return res.send(ResponseObject.success(result));
    } catch (e) {
      console.error(e);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
    }
  }
}
