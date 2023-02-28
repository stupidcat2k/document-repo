import { Entity, PrimaryColumn, Column } from 'typeorm';
import { Model } from './model';

@Entity({ name: 'dr_auth' })
export class Authorize extends Model {
  @PrimaryColumn({ name: 'auth_id' })
  authId: string;

  @Column({ name: 'obj_id' })
  objId: string;

  @Column({ name: 'obj_auth_id' })
  objAuthId: string;

  @Column({ name: 'obj_level_no' })
  lvlNo: boolean;
}
