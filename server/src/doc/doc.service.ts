import { Space } from 'src/entity';
import { PREFIX_MODEL } from 'src/libs/constants';
import { CreateDocDTO } from './dto/create-doc.dto';
import { CommonService } from 'src/libs/common-service/common.service';
import { Header } from '../entity/header.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateDocDTO } from './dto/update-doc.dto';
import { UpdateDocNameDTO } from './dto/update-doc-name.dto';
import { AttachFile } from 'src/entity/attachment.entity';

@Injectable()
export class DocService {
  constructor(
    @InjectRepository(Header) private headerRepository: Repository<Header>,
    @InjectRepository(Space) private spaceRepository: Repository<Space>,
    @InjectRepository(AttachFile) private fileRepository: Repository<AttachFile>,
    private commonService: CommonService,
  ) {}

  async getAllDocsBySpcId(spcId: string, actFlg: boolean) {
    const docs = await this.headerRepository
      .createQueryBuilder('doc')
      .leftJoinAndSelect('doc.space', 'spc')
      .where('spc.spc_id = :id', { id: spcId })
      .andWhere('doc.act_flg = :flg', { flg: actFlg })
      .andWhere('spc.act_flg = :flg', { flg: actFlg })
      .select([
        'doc.cre_dt as "createDate"',
        'doc.cre_usr_id as "createUser"',
        'doc.upd_dt as "updateDate"',
        'doc.upd_usr_id as "updateUser"',
        'doc.hdr_id as "hdrId"',
        'doc.hdr_nm as "hdrNm"',
        'doc.prnt_hdr_id as "prntHdrId"',
        'doc.spc_id as "spcId"',
        'spc.spc_nm as "spcNm"',
      ])
      .getRawMany();
    if (!docs) {
      return this.spaceRepository.findOne({
        select: {
          spcNm: true,
        },
        where: {
          spcId: spcId,
          actFlg: actFlg,
        },
      });
    }
    return docs;
  }

  async getDocDetailHdrId(hdrId: string) {
    const docs = await this.headerRepository.findOne({where: {
      hdrId: hdrId,
      actFlg: true
    }})
    const files = await this.fileRepository.find({where: {
      objId: hdrId
    },
      select: {
        fileLocUrl:true,
        fileNm:true,
        atchNo:true
      }
  })
    return {docs:docs, files:files};
  }

  async createDoc(createDocDTO: CreateDocDTO, userId: string) {
    const hdrId = await this.commonService.createSeqNo(PREFIX_MODEL.Header);
    await this.headerRepository.save({
      createDate: new Date(),
      createUser: userId,
      updateDate: new Date(),
      updateUser: userId,
      hdrCtnt: createDocDTO.txtCtnt,
      hdrId: hdrId.toString(),
      hdrNm: createDocDTO.hdrNm,
      spcId: createDocDTO.spcId,
    });
    return hdrId;
  }

  async updateDocName(updateDocNameDTO: UpdateDocNameDTO, userId: string) {
    const doc = await this.headerRepository.findOne({
      where: { hdrId: updateDocNameDTO.hdrId },
    });
    doc.updateDate = new Date();
    doc.updateUser = userId;
    doc.hdrNm = updateDocNameDTO.hdrNm;
    return await this.headerRepository.save(doc);
  }

  async updateDocDetails(updateDocDTO: UpdateDocDTO, userId: string) {
    const doc = await this.headerRepository.findOne({
      where: { hdrId: updateDocDTO.hdrId },
    });
    doc.updateDate = new Date();
    doc.updateUser = userId;
    doc.hdrNm = updateDocDTO.hdrNm;
    doc.hdrCtnt = updateDocDTO.txtCtnt;
    return await this.headerRepository.save(doc);
  }

  async deleteDocById(id: string, userId: string) {
    const doc = await this.headerRepository.findOne({ where: { hdrId: id } });
    doc.updateDate = new Date();
    doc.updateUser = userId;
    doc.actFlg = false;
    return await this.headerRepository.save(doc);
  }
}
