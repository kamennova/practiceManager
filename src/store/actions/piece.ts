import { Piece, PieceBase } from "../../types/piece";

export const ADD_PIECE = 'Add_piece',
    SET_PIECE = 'Set_piece',
    SET_PIECES_META = 'Set_pieces_meta',
    TOGGLE_PIECE_FAV = 'Toggle_piece_fav',
    EDIT_PIECE = 'Edit_piece',
    DELETE_PIECE = 'Delete_piece',
    SET_PIECES = 'Get_pieces',
    UPDATE_PIECES_PRACTICE = 'Update_practice';

export type SetPiecesAction = {
    type: typeof SET_PIECES,
    pieces: Piece[],
};

export type SetPieceAction = {
    type: typeof SET_PIECE,
    piece: Piece,
};

export type SetPiecesMetaAction = {
    type: typeof SET_PIECES_META,
    pieces: PieceBase[]
};

export type AddPieceAction = {
    type: typeof ADD_PIECE,
    piece: Piece,
};

export type TogglePieceFavAction = {
    id: number,
    type: typeof TOGGLE_PIECE_FAV,
};

export type EditPieceAction = {
    type: typeof EDIT_PIECE,
    piece: PieceBase,
};

export type DeletePieceAction = {
    type: typeof DELETE_PIECE,
    id: number,
};

export type UpdatePiecesPracticeAction = {
    type: typeof UPDATE_PIECES_PRACTICE,
    practice: { [key: number]: number },
};

export const addPiece = (piece: Piece): AddPieceAction => ({ type: ADD_PIECE, piece }),
    setPiece = (piece: Piece): SetPieceAction => ({ type: SET_PIECE, piece }),
    editPiece = (piece: PieceBase): EditPieceAction => ({ type: EDIT_PIECE, piece }),
    togglePieceFav = (id: number): TogglePieceFavAction => ({ type: TOGGLE_PIECE_FAV, id }),
    deletePiece = (id: number): DeletePieceAction => ({ type: DELETE_PIECE, id }),
    setPieces = (pieces: Piece[]): SetPiecesAction => ({ type: SET_PIECES, pieces }),
    setPiecesMeta = (pieces: PieceBase[]): SetPiecesMetaAction => ({ type: SET_PIECES_META, pieces }),
    updatePiecesPractice = (practice: { [key: number]: number }) => ({ type: UPDATE_PIECES_PRACTICE, practice });

export type PieceActionTypes = AddPieceAction
    | SetPiecesMetaAction
    | SetPieceAction
    | EditPieceAction
    | TogglePieceFavAction
    | DeletePieceAction
    | SetPiecesAction
    | UpdatePiecesPracticeAction;
