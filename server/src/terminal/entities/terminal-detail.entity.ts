import { Terminal } from './terminal.entity';
import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class TerminalDetail {
    @PrimaryColumn({name:'teminal_dt_id'})
    terDtId: string;

    @Column({name : 'ter_ctnt'})
    terCtnt: string;

    @ManyToOne(() => Terminal, (ter) => ter.detail,
    )
    @JoinColumn({name:'ter_id'})
    terminal: Terminal[];
}
