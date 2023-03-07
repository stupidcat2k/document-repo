import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Model } from './model';
import { Space } from './space.entity';

@Entity({ name: 'dr_dmn' })
export class Domain extends Model {
  @PrimaryColumn({ name: 'dmn_id' })
  dmnId: string;

  @Column({ name: 'dmn_nm' })
  dmnNm: string;

  @OneToMany(() => Space, (space) => space.domain)
  spaces: Space[];
}
