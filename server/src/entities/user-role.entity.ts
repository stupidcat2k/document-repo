import { Entity, JoinColumn, OneToMany } from "typeorm";
import { Model } from "./common.entity";
import { Role } from "./role.entity";
import { User } from "./user.entity";

@Entity('DR_USR_ROLE')
export class UserGroup extends Model {
    @OneToMany(() => User, (user) => user.usrId, {
        cascade:true
    })
    @JoinColumn({name:'USR_ID'})
    usrId: User;

    @OneToMany(() => Role, (role) => role.roleId, {
        cascade:true
    })
    @JoinColumn({name:'ROLE_ID'})
    roleId: Role;
}   