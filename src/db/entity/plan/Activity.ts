import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { PieceActivityDetailsEntity } from "./PieceActivity";
import { PlanEntity } from "./Plan";
import { TechniqueActivityDetailsEntity } from "./TechniqueActivity";

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

    @OneToOne(_type => (PieceActivityDetailsEntity || TechniqueActivityDetailsEntity), {
        eager: true,
        nullable: true,
        cascade: ['insert', 'update'],
    })
    @JoinColumn()
    details!: PieceActivityDetailsEntity | TechniqueActivityDetailsEntity | null;

    @ManyToOne(_type => PlanEntity, plan => plan.schedule)
    plan!: PlanEntity;
}
