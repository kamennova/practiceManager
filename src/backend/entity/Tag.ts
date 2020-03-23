import { Entity, PrimaryGeneratedColumn, Column } from "typeorm/browser";

@Entity('tag')
export class Tag {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar", { length: 127 })
    name!: string;
}
