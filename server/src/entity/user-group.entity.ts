import { Group } from './group.entity';
import { Entity, JoinColumn, OneToMany } from 'typeorm';
import { Model } from './model';
import { User } from './user.entity';

@Entity({ name: 'dr_usr_grp' })
export class UserGroup extends Model {
  @OneToMany(() => Group, (group) => group.grpId, {
    cascade: true,
  })
  @JoinColumn({ name: 'grp_id' })
  grpId: Group;

  @OneToMany(() => User, (user) => user.usrId, {
    cascade: true,
  })
  @JoinColumn({ name: 'usr_id' })
  usrId: User;
}
