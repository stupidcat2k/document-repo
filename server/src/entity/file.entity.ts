import { Entity, PrimaryColumn, Column } from 'typeorm';
import { Model } from './model';

@Entity({ name: 'dr_atch' })
export class AttachFile extends Model {
  @PrimaryColumn({ name: 'atch_no' })
  atchNo: string;

  @Column({ name: 'file_loc_url' })
  fileLocUrl: string;

  @Column({ name: 'file_sz_no' })
  fileSize: number;

  @Column({ name: 'file_nm' })
  fileNm: string;

  @Column({ name: 'svr_file_nm' })
  svrFileNm: string;

  @Column({ name: 'obj_id' })
  objId: string;
}
