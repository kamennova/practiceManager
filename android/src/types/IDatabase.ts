import { Piece, PieceBase } from "./piece";

export interface IDatabase {
    addPiece(piece: Piece): Promise<number>;

    getPiece(id: number): Promise<Piece | undefined>;

    deletePiece(id: number): Promise<void>;

    getNotificationId(pieceId: number): Promise<number>;

    getPiecesMeta(): Promise<PieceBase[]>;

    toggleIsFavourite(id: number): Promise<void>;

    updatePiece(piece: Piece): Promise<void>;
}
