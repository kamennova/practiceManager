import { Piece, PieceBase } from "../../types/piece";
import { replaceItem } from "../../utils/array";
import {
    ADD_PIECE,
    DELETE_PIECE,
    EDIT_PIECE, EditPieceAction,
    PieceActionTypes, SET_PIECE, SET_PIECES, SET_PIECES_META,
    TOGGLE_PIECE_FAV,
    TOGGLE_PIECE_NOTIFS
} from "../actions/piece";
import { initialState, ItemsShape } from "../StoreState";

export const pieces = (state: ItemsShape<Piece, PieceBase> = initialState.pieces, action: PieceActionTypes): ItemsShape<Piece, PieceBase> => {
    switch (action.type) {
        case ADD_PIECE:
            return { ...state, items: [...state.items, action.piece], lastAddedId: action.piece.id };
        case DELETE_PIECE:
            return { ...state, items: state.items.filter(p => p.id !== action.id) };
        case EDIT_PIECE:
            return { ...state, items: updatePiece(state.items, action) };
        case TOGGLE_PIECE_NOTIFS:
            return state;
        case TOGGLE_PIECE_FAV:
            return { ...state, items: findAndTogglePieceFav(state.items, action.id) };
        case SET_PIECE:
            return { ...state, currentItem: action.piece };
        case SET_PIECES_META:
            return { ...state, items: action.pieces };
        case SET_PIECES:
            return { ...state, items: action.pieces };
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
