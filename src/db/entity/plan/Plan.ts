import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IActivity } from "../activity/IActivity";

@Entity('plan')
export class PlanEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar", { length: 255 })
    name!: string;

    @Column('boolean')
    isFavourite!: boolean;

    @Column("datetime")
    createdOn!: number;

    @OneToMany('PlanActivityEntity', 'plan', { eager: true, cascade: ['insert', 'update'] })
    schedule!: IActivity[];
}
