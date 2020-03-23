import { JoinTable, ManyToMany } from "typeorm";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Author } from "./Author";
import { Tag } from "./Tag";

@Entity('piece')
export class PieceEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar")
    name!: string;

    @Column("datetime")
    addedOn!: number;

    @Column("datetime", { nullable: true })
    lastPracticedOn!: string;

    @Column("boolean")
    notificationsOn!: boolean;

    @Column("smallint")
    notificationsInterval!: number;

    @ManyToMany(_type => Author, { cascade: ['insert'] })
    @JoinTable()
    authors!: Author[];

    @ManyToMany(_type => Tag, { cascade: ['insert'] })
    @JoinTable()
    tags!: Tag[];
}
