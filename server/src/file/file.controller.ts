import { ConfigService } from '@nestjs/config';
import { MAX_FILE_SIZE } from './../libs/constants';
import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import path from 'path';
import { diskStorage } from 'multer';
import { FileService } from './file.service';
import { ResponseObject } from 'src/libs/response-object';
import { SERVER_ERROR_MESSAGE } from 'src/libs/constants';
import { Public } from 'src/libs/decorators/public.decorators';

const ROOT_FOLDER = path.dirname(process.cwd());
const UPLOAD_PATH = process.env.UPLOAD_PATH || 'upload';
@Controller('file')
export class FileController {
  constructor(private fileSerice: FileService) {}

  @Post('upload')
  @Public()
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const bizPath = req.body.bizFolder ? '/' + req.body.bizFolder : '';
			    const path = ROOT_FOLDER + '/' + UPLOAD_PATH + bizPath;
          fs.mkdirSync(path, { recursive: true });
          callback(null, path);
        },
        filename: (req, file, callback) => {
          return callback(null,
            path.parse(file.originalname).name +
            '-' +
            Date.now() +
            path.extname(file.originalname));
        },
      }),
      limits: { fileSize: MAX_FILE_SIZE },
    }),
  )
  async uploadFile(
    @Req() req,
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res,
  ) {
    try {
      const { objId, userId, bizFolder }= req.body;
      const bizPath = bizFolder ? '/' + bizFolder : '';
      //handle path in database
      files.map((file) => {
        file.path = bizPath
				? bizPath + '/' + file.filename
				: '/' + file.filename;
      });
        this.fileSerice.insertFile(files, userId, objId);
      return res.send(
        ResponseObject.success({
          data: files.map((file) => file.path),
        }),
      );
    } catch (error) {
      console.log(error);
      return res.send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
    }
  }

  @Get('upload/:bizPath/:fileName')
  @Public()
  async downloadFile(
    @Param('bizPath') bizPath,
    @Param('fileName') fileName,
    @Res() res,
  ) {
    const folderPath = bizPath ? '/' + bizPath : '';
    return res.sendFile(fileName, {
      root: ROOT_FOLDER + '/' + UPLOAD_PATH + folderPath,
    });
  }

  @Post('ckeditor')
  @Public()
  @UseInterceptors(
    FilesInterceptor('upload', 1, {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const bizPath = '/ckeditor'
			    const path = ROOT_FOLDER + '/' + UPLOAD_PATH + bizPath;
          fs.mkdirSync(path, { recursive: true });
          callback(null, path);
        },
        filename: (req, file, callback) => {
          return callback(null,
            path.parse(file.originalname).name +
            '-' +
            Date.now() +
            path.extname(file.originalname));
        },
      }),
      limits: { fileSize: MAX_FILE_SIZE },
    }),
  )
  async ckeditor(
    @Req() req,
    @UploadedFiles() upload: Express.Multer.File,
    @Res() res,
  ) {
    const BIZ_PATH = '/ckeditor';
    const API_PATH = 'api/file/'
    const configService = new ConfigService();
    const HOST_PATH = configService.get('HOST_END_POINT') + ':' + configService.get('PORT') + '/';
    upload[0].path = HOST_PATH + API_PATH + UPLOAD_PATH + BIZ_PATH + '/' + upload[0].filename;
    const url = upload[0].path
    return res.send({
      url:url
    });
  }
}
