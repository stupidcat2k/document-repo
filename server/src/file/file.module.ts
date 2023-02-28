import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from './file.controller';
import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { AttachFile } from 'src/entity/file.entity';
import { CommonService } from 'src/libs/common-service/common.service';

@Module({
  imports: [TypeOrmModule.forFeature([AttachFile])],
  controllers: [FileController],
  providers: [FileService, CommonService],
  exports: [FileService],
})
export class FileModule {}
