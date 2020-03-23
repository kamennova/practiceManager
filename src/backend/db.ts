import { getRepository } from "typeorm";
import { Piece } from "../types/Piece";
import { Author } from "./entity/Author";
import { PieceEntity } from "./entity/Piece";
import { Tag } from "./entity/Tag";

export const addPiece = async (piece: Piece): Promise<Piece> => {
    const newPiece = new PieceEntity();
    newPiece.name = piece.name;
    newPiece.addedOn = Date.now();
    newPiece.notificationsInterval = piece.notifications.interval;
    newPiece.notificationsOn = piece.notifications.enabled;

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

    return Promise.resolve({ ...piece, id: newPiece.id });
};

export const getPieceById = async (id: number): Promise<Piece | undefined> => {
    const ent = await getRepository(PieceEntity).findOne(id, { relations: ['authors', 'tags'] });

    if (ent === undefined) {
        return Promise.resolve(undefined);
    }

    return Promise.resolve(pieceFromEntity(ent));
};

export const getPieces = async (): Promise<Piece[]> =>
    (await getRepository(PieceEntity).find({ relations: ['authors', 'tags'] })).map(pieceFromEntity);

export const pieceFromEntity = (ent: PieceEntity): Piece => ({
    id: ent.id,
    name: ent.name,
    timeSpent: 0,
    notifications: {
        interval: ent.notificationsInterval,
        enabled: ent.notificationsOn,
    },
    tags: ent.tags.map(tag => tag.name),
    authors: ent.authors.map(author => author.name),
});
