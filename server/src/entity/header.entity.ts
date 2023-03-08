import { Content } from './content.entity';
import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Model } from './model';
import { Space } from './space.entity';

@Entity({ name: 'dr_hdr' })
export class Header extends Model {
  @PrimaryColumn({ name: 'hdr_id' })
  hdrId: string;

  @Column({ name: 'prnt_hdr_id' })
  prntHdrId: string;

  @Column({ name: 'hdr_nm'})
  hdrNm: string;

  @Column({ name:'spc_id'})
  spcId: string;

  @ManyToOne(() => Space, (space) => space.headers, {
    cascade: true,
  })
  @JoinColumn({ name: 'spc_id' })
  space: Space;
}
