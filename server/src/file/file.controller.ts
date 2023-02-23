import {
  Controller,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/libs/decorators/public.decorators';
import * as fs from 'fs';
import { CurrentUser } from 'src/libs/decorators/current-user.decorator';
import path from 'path';
import { diskStorage } from 'multer';

const uploadPath = 'upload';
//get current file path then join to document-repo to create folder upload same level as client, server
const currentPath = path.dirname(__filename);
const pathFolder = path.join(currentPath, '..', '..', '..');

@Public()
@Controller('file')
export class FileController {

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 20, {
    storage: diskStorage({
      destination: (req ,file , callback) => {
        const docFolder = req.body.docFolder ? '/' + req.body.docFolder : '';
        const path = pathFolder + '/' + uploadPath + docFolder;
        fs.mkdirSync(path, {recursive: true});
        callback(null, path);
      },
      filename: (req,file, callback) => {
        return callback(null, file.originalname)
      }
    })
  }))
  async uploadFile(
    @CurrentUser('usrId') UserId,
    @Req() req,
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res) {

    return res.send({
      data: files.map((file) => file.path.split(uploadPath)[1])
    })
  }
}
