import { Entity, JoinColumn, OneToMany } from 'typeorm';
import { Model } from './model';
import { Group } from './group.entity';
import { Role } from './role.entity';

@Entity({ name: 'dr_grp_role' })
export class GroupRole extends Model {
  @OneToMany(() => Group, (group) => group.grpId, {
    cascade: true,
  })
  @JoinColumn({ name: 'grp_id' })
  grpId: Group;

  @OneToMany(() => Role, (role) => role.roleId, {
    cascade: true,
  })
  @JoinColumn({ name: 'role_id' })
  roleId: Role;
}
