import { store } from "../../store/appReducers";
import { CheckResult } from "../../types/CheckResult";
import { Piece } from "../../types/piece";

export const validatePiece = (piece: Piece): CheckResult => {
    if (piece.name.length === 0) {
        return { valid: false, errors: 'You forgot to enter piece title ✍' };
    }

    const pieces = store.getState().pieces.items;

    if (pieces.find(item => item.name === piece.name && item.id !== piece.id)) {
        return { valid: false, errors: 'A piece with the same name already exists' }
    }

    return { valid: true };
};
