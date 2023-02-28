import { Entity, PrimaryColumn, Column } from 'typeorm';
import { Model } from './model';

@Entity({ name: 'dr_usr' })
export class User extends Model {
  @PrimaryColumn({ name: 'usr_id' })
  usrId: string;

  @Column({ name: 'usr_nm' })
  usrNm: string;

  @Column({ name: 'usr_pwd' })
  usrPwd: string;

  @Column({ name: 'act_flg' })
  actFlg: boolean;
}
