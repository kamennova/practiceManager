import { getRepository } from "typeorm";
import { PieceEntity } from "./entity/Piece";

export type CheckResult = {
    valid: boolean,
    errors?: string,
}

export const validatePiece = async (piece: PieceEntity): Promise<CheckResult> => {
    if (piece.name.length === 0) {
        return Promise.resolve({ valid: false, errors: 'Piece title should be filled' });
    }

    const pieceRepo = getRepository(PieceEntity);
    const piecesWithSameName = await pieceRepo.find({ where: { name: piece.name }, relations: ['authors'] });

    if (piecesWithSameName.length > 0) {
        if (piecesWithSameName.find(item => item.authors === piece.authors) !== undefined) {
            return Promise.resolve({ valid: false, errors: 'Piece with same name and author(s) already exists' });
        }
    }

    return Promise.resolve({ valid: true });
};
