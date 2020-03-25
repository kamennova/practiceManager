import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('note')
export class NoteEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar", { length: 400 })
    content!: string;

    @Column("datetime")
    addedOn!: number;
}
