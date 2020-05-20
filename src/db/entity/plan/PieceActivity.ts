import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('pieceActivityDetails')
export class PieceActivityDetailsEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('integer', { nullable: true })
    pieceId!: number | null;
}
