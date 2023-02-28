import { CommonService } from '../libs/common-service/common.service';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { AttachFile } from 'src/entity/file.entity';
import { Repository, Connection } from 'typeorm';
import { Attachment } from 'src/libs/constants';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(AttachFile) private attachFile: Repository<AttachFile>,
    @InjectConnection() private readonly connection: Connection,
    private commonService: CommonService,
  ) {}

  async insertFile(
    files: Express.Multer.File[],
    loginUsrId: string,
    objId: string,
  ) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
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
          atchNo: atchNo.toString(),
        });
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
