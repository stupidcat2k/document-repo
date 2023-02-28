import {
  Controller,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { CurrentUser } from 'src/libs/decorators/current-user.decorator';
import path from 'path';
import { diskStorage } from 'multer';
import { FileService } from './file.service';
import { ResponseObject } from 'src/libs/dto/response-object.dto';
import { SERVER_ERROR_MESSAGE } from 'src/libs/constants';

const uploadPath = 'upload';
//get current file path then join to document-repo to create folder upload same level as client, server
const currentPath = path.dirname(__filename);
const pathFolder = path.join(currentPath, '..', '..', '..');

@Controller('file')
export class FileController {
  constructor(private fileSerice: FileService) {}

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const docFolder = req.body.docFolder ? '/' + req.body.docFolder : '';
          const path = pathFolder + '/' + uploadPath + docFolder;
          fs.mkdirSync(path, { recursive: true });
          callback(null, path);
        },
        filename: (req, file, callback) => {
          return callback(null, file.originalname);
        },
      }),
    }),
  )
  async uploadFile(
    @CurrentUser('userId') userId,
    @Req() req,
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res,
  ) {
    try {
      const objId = req.body.objId;
      this.fileSerice.insertFile(files, userId, objId);
      return res.send(ResponseObject.success({
        data: files.map((file) => file.path.split(uploadPath)[1]),
      }));
    } catch (error) {
      console.log(error);
      return res.send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
    }
  }
}
