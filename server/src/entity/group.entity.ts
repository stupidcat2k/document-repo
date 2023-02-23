import { Entity, PrimaryColumn, Column } from 'typeorm';
import { Model } from './model';

@Entity({ name: 'DR_GRP' })
export class Group extends Model {
  @PrimaryColumn({ name: 'GRP_ID' })
  grpId: string;

  @Column({ name: 'GRP_NM' })
  grpNm: string;
}
