import { Entity, PrimaryColumn, Column } from 'typeorm';
import { Model } from './model';

@Entity({ name: 'dr_role' })
export class Role extends Model {
  @PrimaryColumn({ name: 'role_id' })
  roleId: string;

  @Column({ name: 'role_nm' })
  roleNm: string;
}
