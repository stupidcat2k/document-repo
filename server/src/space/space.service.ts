import { CommonService } from '../libs/common-service/common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Space } from 'src/entity';
import { PREFIX_MODEL } from 'src/libs/constants';
import { CreateSpaceDto } from './dto/create-space.dto';

@Injectable()
export class SpaceService {
  constructor(
    @InjectRepository(Space) private spaceRepository: Repository<Space>,
    private commonService: CommonService,
  ) {}

  async selectActiveSpace() {
    return this.spaceRepository.find({
      select: {
        spcId: true,
        spcNm: true,
      },
      where: {
        actFlg: true,
      },
    });
  }

 async createNewSpace(createSpaceDto : CreateSpaceDto, userId : string) {
  const spcId = await this.commonService.createSeqNo(PREFIX_MODEL.Space);
  return await this.spaceRepository.save({
    createDate: new Date(),
    createUser: userId,
    updateDate: new Date(),
    updateUser: userId,
    prntSpcId: createSpaceDto.prntSpcId,
    spcNm: !createSpaceDto.spcNm ? 'New Folder without name' : createSpaceDto.spcNm,
    spcId: spcId.toString(),
    dmnId: createSpaceDto.dmnId || '1',
  })
 } 
}
