import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('techniqueActivityDetails')
export class TechniqueActivityDetailsEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true, type: 'varchar' })
    exercise!: string | null;

    @Column({ nullable: true, type: 'varchar' })
    tonality!: string | null;
}
