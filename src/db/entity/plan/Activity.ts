import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PieceActivityDetailsEntity } from "./PieceActivity";
import { TechniqueActivityDetailsEntity } from "./TechniqueActivity";

@Entity('activity')
export class ActivityEntity {
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
}
