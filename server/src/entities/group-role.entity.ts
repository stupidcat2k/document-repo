import { Entity, JoinColumn, OneToMany } from "typeorm";
import { Model } from "./common.entity";
import { Group } from "./group.entity";
import { Role } from "./role.entity";

@Entity('DR_GRP_ROLE')
export class GroupRole extends Model {
    @OneToMany(() => Group, (group) => group.grpId, {
        cascade:true
    })
    @JoinColumn({name:'GRP_ID'})
    grpId: Group;

    @OneToMany(() => Role, (role) => role.roleId, {
        cascade:true
    })
    @JoinColumn({name:'ROLE_ID'})
    roleId: Role;
}   