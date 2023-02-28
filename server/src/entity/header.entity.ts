import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Model } from './model';
import { Space } from './space.entity';

@Entity({ name: 'dr_hdr' })
export class Header extends Model {
  @PrimaryColumn({ name: 'hdr_id' })
  hdrId: string;

  @Column({ name: 'prnt_hdr_id' })
  prntHdrId: string;

  @OneToMany(() => Space, (space) => space.spcId, {
    cascade: true,
  })
  @JoinColumn({ name: 'spc_id' })
  spcId: Space;
}