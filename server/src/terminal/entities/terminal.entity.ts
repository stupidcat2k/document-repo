import { TerminalDetail } from './terminal-detail.entity';
import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Terminal {
    @PrimaryColumn({name:'ter_id'})
    terId: string;

    @Column({name:'ter_nm'})
    terNm: string;

    @OneToMany(() => TerminalDetail, (details) => details.terminal, {
        cascade:true
    })
    detail: TerminalDetail;

}
