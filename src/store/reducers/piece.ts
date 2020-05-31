import { Piece, PieceBase, PieceStatus } from "../../types/piece";
import { replaceItem } from "../../utils/array";
import {
    ADD_PIECE,
    DELETE_PIECE,
    EDIT_PIECE,
    EditPieceAction,
    PieceActionTypes,
    SET_PIECES,
    SET_PIECES_META,
    TOGGLE_PIECE_FAV,
    UPDATE_PIECES_PRACTICE,
    UpdatePiecesPracticeAction
} from "../actions";
import { initialState, ItemsShape } from "../StoreState";

export const pieces = (state: ItemsShape<Piece, PieceBase> = initialState.pieces, action: PieceActionTypes): ItemsShape<Piece, PieceBase> => {
    switch (action.type) {
        case ADD_PIECE:
            return { ...state, items: [...state.items, action.piece], lastAddedId: action.piece.id };
        case DELETE_PIECE:
            return { ...state, items: state.items.filter(p => p.id !== action.id) };
        case EDIT_PIECE:
            return { ...state, items: updatePiece(state.items, action) };
        case TOGGLE_PIECE_FAV:
            return { ...state, items: findAndTogglePieceFav(state.items, action.id) };
        case SET_PIECES_META:
            return { ...state, items: action.pieces };
        case SET_PIECES:
            return { ...state, items: action.pieces };
        case UPDATE_PIECES_PRACTICE:
            return { ...state, items: updatePractice(state.items, action) };
        default:
            return state;
    }
};

const updatePiece = (state: PieceBase[], action: EditPieceAction): PieceBase[] =>
    replaceItem<PieceBase>(state, action.piece);

const findAndTogglePieceFav = (items: PieceBase[], id: number) => {
    const item = items.find(i => i.id === id);
    if (item === undefined) throw new Error('piece not found');

    return replaceItem<PieceBase>(items, { ...item, isFavourite: !item.isFavourite });
};

const updatePractice = (pieces: PieceBase[], action: UpdatePiecesPracticeAction): PieceBase[] => {
    const ids = Object.keys(action.practice);

    return pieces.map(piece => {
        if (ids.includes(piece.id.toString())) {
            piece.lastPracticedOn = new Date();
            piece.status = PieceStatus.InWork;
            piece.timeSpent += action.practice[piece.id];
        }

        return piece;
    })
};
