import { Entity, PrimaryColumn, Column } from "typeorm";
import { Model } from "./common.entity";

@Entity('DR_ROLE')
export class Role extends Model {
    @PrimaryColumn({name:'ROLE_ID'})
    roleId: string;

    @Column({name:'ROLE_NM'})
    roleNm: string;
}