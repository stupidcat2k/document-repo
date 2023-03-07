import { ResponseObject } from '../libs/response-object';
import { DocService } from './doc.service';
import { Controller, Get, HttpStatus, NotFoundException, Param, Res } from "@nestjs/common";
import { Response } from 'express';
import { SERVER_ERROR_MESSAGE } from 'src/libs/constants';

@Controller('doc')
export class DocController {
    constructor(private docService: DocService){}

    @Get(':id')
    async findAllDocsBySpcId(@Param('id') id: string, @Res() res: Response) {
        try {
            const result = await this.docService.getAllDocsBySpcId(id);
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
}