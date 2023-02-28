import { Entity, JoinColumn, OneToMany } from 'typeorm';
import { Model } from './model';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity({ name: 'dr_usr_role' })
export class UserRole extends Model {
  @OneToMany(() => User, (user) => user.usrId, {
    cascade: true,
  })
  @JoinColumn({ name: 'usr_id' })
  usrId: User;

  @OneToMany(() => Role, (role) => role.roleId, {
    cascade: true,
  })
  @JoinColumn({ name: 'role_id' })
  roleId: Role;
}
