import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ISession } from "./ISession";

@Entity('sessionActivity')
export class SessionActivityEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('integer')
    activityId!: number;

    @ManyToOne('SessionEntity', 'history')
    session!: ISession;
}
