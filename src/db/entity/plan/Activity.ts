import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IPlan } from "./IPlan";
import { PieceActivityDetailsEntity } from "./PieceActivity";
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

    @ManyToOne('PlanEntity', 'schedule')
    plan!: IPlan;
}
