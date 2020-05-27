import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column('integer', { nullable: true })
    detailsId!: number | null;
}
