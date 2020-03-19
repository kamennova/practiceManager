import { getRepository } from "typeorm";
import { Piece } from "../types/Piece";
import { Author } from "./entity/Author";
import { PieceEntity } from "./entity/Piece";
import { Tag } from "./entity/Tag";

export const addPiece = async (piece: Piece): Promise<PieceEntity> => {
    const newPiece = new PieceEntity();
    newPiece.name = piece.name;
    newPiece.addedOn = Date.now();
    newPiece.notificationsInterval = piece.notificationsInterval;
    newPiece.notificationsOn = piece.notificationsOn;

    newPiece.tags = piece.tags.map(tag => {
        const ent = new Tag();
        ent.name = tag;

        return ent;
    });

    newPiece.authors = piece.authors.map(author => {
        const ent = new Author();
        ent.name = author;

        return ent;
    });

    const pieceRepository = getRepository(PieceEntity);
    await pieceRepository.save(newPiece);

    return Promise.resolve(newPiece);
};
