import { DocService } from './doc.service';
import { DocController } from './doc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommonService } from 'src/libs/common-service/common.service';
import { Header, Space } from 'src/entity';
import { AttachFile } from 'src/entity/attachment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Header, Space, AttachFile])],
  controllers: [DocController],
  providers: [DocService, CommonService],
  exports: [DocService],
})
export class DocModule {}
