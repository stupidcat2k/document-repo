import { Entity, PrimaryColumn, Column } from 'typeorm';
import { Model } from './model';

@Entity({ name: 'DR_USR' })
export class User extends Model {
  @PrimaryColumn({ name: 'USR_ID' })
  usrId: string;

  @Column({ name: 'USR_NM' })
  usrNm: string;

  @Column({ name: 'USR_PWD' })
  usrPwd: string;

  @Column({ name: 'ACT_FLG' })
  actFlg: boolean;
}
