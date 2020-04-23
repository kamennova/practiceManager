import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PlanActivityEntity } from "./Activity";

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

    @OneToMany(_type => PlanActivityEntity, activity => activity.plan, { eager: true, cascade: ['insert', 'update'] })
    schedule!: PlanActivityEntity[];
}
