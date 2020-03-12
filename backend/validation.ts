import { Piece } from "../types/Piece";
import db from "./Database";

const { getPiecesByName } = db();

export type CheckResult = {
    valid: boolean,
    errors?: string,
}

export const validatePiece = async (piece: Piece): Promise<CheckResult> => {
    if (piece.name.length === 0) {
        return Promise.resolve({ valid: false, errors: 'Piece title should be filled' });
    }

    const piecesWithSameName = await getPiecesByName(piece.name);

    if (piecesWithSameName.length > 0) {
        if (piecesWithSameName.find(item => item.authors === piece.authors) !== undefined) {
            return Promise.resolve({ valid: false, errors: 'Piece with same name and author(s) already exists' });
        }
    }

    return Promise.resolve({ valid: true });
};
