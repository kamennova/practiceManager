import { Entity, PrimaryGeneratedColumn, Column } from "typeorm/browser";

@Entity('author')
export class Author {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar", { length: 255 })
    name!: string;
}
