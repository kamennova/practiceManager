import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne(_type => PlanActivityEntity, { eager: true, cascade: true })
    schedule!: PlanActivityEntity[];
}
