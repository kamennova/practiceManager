import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IPlan } from "./IPlan";

@Entity('planActivity')
export class PlanActivityEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('integer')
    activityId!: number;

    @ManyToOne('PlanEntity', 'schedule')
    plan!: IPlan;
}
