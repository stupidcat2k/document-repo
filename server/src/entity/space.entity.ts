import { Domain } from './domain.entity';
import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Model } from './model';

@Entity({ name: 'dr_spc' })
export class Space extends Model {
  @PrimaryColumn({ name: 'spc_id' })
  spcId: string;

  @Column({ name: 'prnt_spc_id]' })
  prntSpcId: string;

  @OneToMany(() => Domain, (domain) => domain.dmnId, {
    cascade: true,
  })
  @JoinColumn({ name: 'dmn_id' })
  dmnId: Domain;
}