import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IPlan } from "./IPlan";

@Entity('planActivity')
export class PlanActivityEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar", { length: 127 })
    type!: string;

    @Column('integer')
    duration!: number;

    @Column('integer')
    order!: number;

    @ManyToOne('PlanEntity', 'schedule')
    plan!: IPlan;
}
