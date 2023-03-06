import { Domain } from './domain.entity';
import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Model } from './model';

@Entity({ name: 'dr_spc' })
export class Space extends Model {
  @PrimaryColumn({ name: 'spc_id' })
  spcId: string;

  @Column({ name: 'spc_nm' })
  spcNm: string;

  @Column({ name: 'prnt_spc_id' })
  prntSpcId: string;

  @Column({ name: 'act_flg' })
  actFlg: boolean;

  @ManyToOne(() => Domain, (domain) => domain.spaces, {
    cascade: true,
  })
  @JoinColumn({ name: 'dmn_id' })
  domain: Domain;
}
