import { Column } from "typeorm";

export class Model {
    @Column({name:'CRE_DT'})
    createDate: Date;

    @Column({name:'CRE_USR_ID'})
    createUser: string;

    @Column({name:'UPD_DT'})
    updateDate: Date;

    @Column({name:'UPD_USR_ID'})
    updateUser: string;
}