import { UpdateSpaceDTO } from './dto/update-space.dto';
import { CommonService } from '../libs/common-service/common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Space } from 'src/entity';
import { PREFIX_MODEL } from 'src/libs/constants';
import { CreateSpaceDTO } from './dto/create-space.dto';

@Injectable()
export class SpaceService {
  constructor(
    @InjectRepository(Space) private spaceRepository: Repository<Space>,
    private commonService: CommonService,
  ) {}

  async selectSpace(actFlg: boolean) {
    return this.spaceRepository.find({
      select: {
        spcId: true,
        spcNm: true,
      },
      where: {
        actFlg: actFlg,
      },
      order: {
        spcNm: 'ASC',
      },
    });
  }

  async createNewSpace(createSpaceDto: CreateSpaceDTO, userId: string) {
    const spcId = await this.commonService.createSeqNo(PREFIX_MODEL.Space);
    return await this.spaceRepository.save({
      createDate: new Date(),
      createUser: userId,
      updateDate: new Date(),
      updateUser: userId,
      prntSpcId: createSpaceDto.prntSpcId,
      spcNm: !createSpaceDto.spcNm
        ? 'New Folder without name'
        : createSpaceDto.spcNm,
      spcId: spcId.toString(),
      dmnId: createSpaceDto.dmnId || '1',
    });
  }

  async updateSpace(updateSpaceDTO: UpdateSpaceDTO, userId: string) {
    const space = await this.spaceRepository.findOne({
      where: { spcId: updateSpaceDTO.spcId },
    });
    space.updateDate = new Date();
    space.updateUser = userId;
    space.spcNm = updateSpaceDTO.spcNm;
    space.actFlg = updateSpaceDTO.actFlg ? updateSpaceDTO.actFlg : space.actFlg;
    const result = await this.spaceRepository.save(space);
    return result;
  }

  async deleteSpaceById(id: string, userId: string) {
    const space = await this.spaceRepository.findOne({ where: { spcId: id } });
    space.updateDate = new Date();
    space.updateUser = userId;
    space.actFlg = false;
    return await this.spaceRepository.save(space);
  }

  async deleteSpacePermaById(id: string) {
    const result = await this.spaceRepository.delete({ spcId: id });
    return result;
  }
}
