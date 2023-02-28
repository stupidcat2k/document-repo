import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Header } from './header.entity';
import { Model } from './model';

@Entity({ name: 'dr_ctnt' })
export class Content extends Model {
  @PrimaryColumn({ name: 'ctnt_id' })
  ctntId: string;

  @OneToMany(() => Header, (header) => header.hdrId, {
    cascade: true,
  })
  @JoinColumn({ name: 'hdr_id' })
  hdrId: Header;

  @Column({ name: 'doc_ctnt' })
  docCtnt: string;
}