import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
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

    @OneToOne(_type => PieceActivityDetailsEntity || TechniqueActivityDetailsEntity || null, {
        eager: true,
        nullable: true,
        cascade: true,
    })
    @JoinColumn()
    details!: PieceActivityDetailsEntity | TechniqueActivityDetailsEntity | null;
}
