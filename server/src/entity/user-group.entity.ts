import { Group } from './group.entity';
import { Entity, JoinColumn, OneToMany } from 'typeorm';
import { Model } from './model';
import { User } from './user.entity';

@Entity({ name: 'DR_USR_GRP' })
export class UserGroup extends Model {
  @OneToMany(() => Group, (group) => group.grpId, {
    cascade: true,
  })
  @JoinColumn({ name: 'GRP_ID' })
  grpId: Group;

  @OneToMany(() => User, (user) => user.usrId, {
    cascade: true,
  })
  @JoinColumn({ name: 'USR_ID' })
  usrId: User;
}
