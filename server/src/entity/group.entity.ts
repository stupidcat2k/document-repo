import { Entity, PrimaryColumn, Column } from 'typeorm';
import { Model } from './model';

@Entity({ name: 'dr_grp' })
export class Group extends Model {
  @PrimaryColumn({ name: 'grp_id' })
  grpId: string;

  @Column({ name: 'grp_nm' })
  grpNm: string;
}
