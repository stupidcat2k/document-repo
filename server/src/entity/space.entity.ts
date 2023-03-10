import { Domain } from './domain.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Model } from './model';
import { Header } from './header.entity';

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

  @Column({ name: 'dmn_id' })
  dmnId: string;

  @ManyToOne(() => Domain, (domain) => domain.spaces, {
    cascade: true,
  })
  @JoinColumn({ name: 'dmn_id' })
  domain: Domain;

  @OneToMany(() => Header, (header) => header.space)
  headers: Header[];
}
