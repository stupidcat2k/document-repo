import { CommonService } from '../libs/common-service/common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { AttachFile } from 'src/entity/file.entity';
import { Repository } from 'typeorm';
import { Attachment } from 'src/libs/constants';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(AttachFile) private attachFile: Repository<AttachFile>,
    private commonService: CommonService,
  ) {}

  async insertFile(
    files: Express.Multer.File[],
    loginUsrId: string,
    objId: string,
  ) {
      for (const file of files) {
        const atchNo = await this.commonService.createSeqNo(Attachment);
        this.attachFile.save({
          createDate: new Date(),
          createUser: loginUsrId,
          updateDate: new Date(),
          updateUser: loginUsrId,
          fileLocUrl: file.path,
          fileNm: file.originalname,
          fileSize: file.size,
          objId: objId,
          atchNo: atchNo.toString()
        });
      };
  }
}