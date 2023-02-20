import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    usrId: string;

    @Column()
    password: string;

    @Column()
    firstNm: string;

    @Column()
    lastNm: string;

    @Column()
    brdy_val: Date;

    @Column({ default: true })
    isActive: boolean;

    @Column()
    isAdmin: boolean;
}
