import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('recording')
export class RecordingEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar", { length: 255 })
    uri!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    name!: string;

    @Column("datetime")
    addedOn!: number;
}
