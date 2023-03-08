import { CommonService } from 'src/libs/common-service/common.service';
import { Header } from '../entity/header.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateDocDTO } from './dto/update-doc.dto';

@Injectable()
export class DocService {
    constructor(@InjectRepository(Header) private headerRepository: Repository<Header>,
    private commonService: CommonService) {}

    async getAllDocsBySpcId(spcId: string){
        const docs = await this.headerRepository
        .createQueryBuilder('doc')
        .leftJoinAndSelect('doc.space', 'spc')
        .where('spc.spc_id = :id', {id: spcId})
        .select(['doc.cre_dt as "createDate"'
        ,'doc.cre_usr_id as "createUser"'
        ,'doc.upd_dt as "updateDate"'
        ,'doc.upd_usr_id as "updateUser"'
        ,'doc.hdr_id as "hdrId"'
        ,'doc.hdr_nm as "hdrNm"'
        ,'doc.prnt_hdr_id as "prntHdrId"'
        ,'doc.spc_id as "spcId"'
        ,'spc.spc_nm as "spcNm"'])
        .getRawMany();
        return docs;
    }

    async updateDoc(updateDocDTO: UpdateDocDTO, userId: string){
        const doc = await this.headerRepository.findOne({ where: { hdrId: updateDocDTO.hdrId } });
        doc.updateDate = new Date();
        doc.updateUser = userId;
        doc.hdrNm = updateDocDTO.hdrNm; 
        return await this.headerRepository.save(doc);
    }
}