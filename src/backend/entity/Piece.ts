import { JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { AuthorEntity } from "./Author";
import { NoteEntity } from "./Note";
import { TagEntity } from "./Tag";

@Entity('piece')
export class PieceEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar")
    name!: string;

    @Column('boolean')
    isFavourite!: boolean;

    @Column('varchar', { length: 255, nullable: true })
    imageUri!: string;

    @Column("datetime")
    addedOn!: number;

    @Column("datetime", { nullable: true })
    lastPracticedOn!: string;

    @Column("boolean")
    notificationsOn!: boolean;

    @Column("smallint")
    notificationsInterval!: number;

    @ManyToMany(_type => AuthorEntity, { cascade: ['insert'] })
    @JoinTable()
    authors!: AuthorEntity[];

    @ManyToMany(_type => TagEntity, { cascade: ['insert'] })
    @JoinTable()
    tags!: TagEntity[];

    @ManyToOne(_type => NoteEntity, { cascade: ['insert'] })
    @JoinTable()
    notes!: NoteEntity[];
}
