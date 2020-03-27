import { Unique } from "typeorm";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm/browser";

@Entity('tag')
@Unique(['name'])
export class TagEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar", { length: 127 })
    name!: string;
}
