import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IActivity } from "../activity/IActivity";
import { PlanEntity } from "../plan";

@Entity('session')
export class SessionEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(_type => PlanEntity, { nullable: true })
    plan!: PlanEntity | null;

    @Column("datetime")
    startedOn!: number;

    @OneToMany('SessionActivityEntity', 'session', { eager: true, cascade: true })
    history!: IActivity[];
}
