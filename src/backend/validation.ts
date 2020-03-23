import { getRepository } from "typeorm";
import { Piece } from "../types/Piece";
import { PieceEntity } from "./entity/Piece";

export type CheckResult = {
    valid: boolean,
    errors?: string,
}

export const validatePiece = async (piece: Piece): Promise<CheckResult> => {
    if (piece.name.length === 0) {
        return Promise.resolve({ valid: false, errors: 'You forgot to enter piece title ✍' });
    }

    const pieceRepo = getRepository(PieceEntity);
    const piecesWithSameName = await pieceRepo.find({ where: { name: piece.name }, relations: ['authors'] });

    if (piecesWithSameName.length > 0) {
        if (piecesWithSameName.find(item => areAuthorsSame(item, piece) !== undefined)) {
            return Promise.resolve({
                valid: false,
                errors: 'A piece with the same name and author(s) already exists 🤷‍'
            });
        }
    }

    return Promise.resolve({ valid: true });
};

const areAuthorsSame = (piece1: PieceEntity, piece2: Piece) => {
    if (piece1.authors.length === 0 && piece2.authors.length === 0) {
        return true;
    } else if (piece2.authors.find(
        (author) => piece1.authors.find(a => a.name !== author) !== undefined)) {
        return false;
    }

    return true;
};
