import { Entity, PrimaryColumn, Column } from 'typeorm';
import { Model } from './model';

@Entity({ name: 'dr_dmn' })
export class Domain extends Model {
  @PrimaryColumn({ name: 'dmn_id' })
  dmnId: string;

  @Column({ name: 'dmn_nm' })
  dmnNm: string;
}
