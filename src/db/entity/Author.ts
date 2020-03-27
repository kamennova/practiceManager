import { Unique } from "typeorm";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm/browser";

@Entity('author')
@Unique(['name'])
export class AuthorEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar", { length: 255 })
    name!: string;
}
