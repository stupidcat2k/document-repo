import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommonService } from 'src/libs/common-service/common.service';
import { Space } from 'src/entity';
import { SpaceController } from './space.controller';
import { SpaceService } from './space.service';

@Module({
  imports: [TypeOrmModule.forFeature([Space])],
  controllers: [SpaceController],
  providers: [SpaceService, CommonService],
  exports: [SpaceService],
})
export class SpaceModule {}
