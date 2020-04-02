import { getRepository } from "typeorm";
import { Piece } from "../types/Piece";
import { PieceEntity } from "./entity/Piece";

export type CheckResult = { valid: true } | {
    valid: false,
    errors: string,
};

export const validatePlan = async (planName: string): Promise<CheckResult> => {
    if (planName.length === 0) {
        return Promise.resolve({ valid: false, errors: 'You forgot to enter plan title ✍' });
    }

    // todo
    return Promise.resolve({ valid: true });
};

export const validatePiece = async (piece: Piece): Promise<CheckResult> => {
    if (piece.name.length === 0) {
        return Promise.resolve({ valid: false, errors: 'You forgot to enter piece title ✍' });
    }

    const pieceRepo = getRepository(PieceEntity);
    const piecesWithSameName = (await pieceRepo.find({ where: { name: piece.name }, relations: ['authors'] }))
        .filter(item => item.id !== piece.id);

    if (piecesWithSameName.length > 0) {
        if (piece.authors.length === 0 || piecesWithSameName.find(item => areAuthorsSame(item, piece) !== undefined)) {
            return Promise.resolve({
                valid: false,
                errors: 'A piece with the same name and author(s) already exists 🤷‍'
            });
        }
    }

    return Promise.resolve({ valid: true });
};

const areAuthorsSame = (pieceInDb: PieceEntity, piece: Piece) => {
    if (pieceInDb.authors.length !== piece.authors.length) {
        return false;
    }

    if (pieceInDb.authors.length === 0) {
        return true;
    }

    for (let i = 0; i < pieceInDb.authors.length; i++) {
        if (piece.authors.indexOf(pieceInDb.authors[i].name) === undefined)
            return false;
    }

    return true;
};
