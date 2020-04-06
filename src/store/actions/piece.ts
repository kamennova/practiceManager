import { Piece, PieceBase } from "../../types/Piece";

export const ADD_PIECE = 'Add_piece',
    SET_PIECE = 'Set_piece',
    SET_PIECES_META = 'Set_pieces_meta',
    TOGGLE_PIECE_NOTIFS = 'Toggle_piece_notifs',
    TOGGLE_PIECE_FAV = 'Toggle_piece_fav',
    EDIT_PIECE = 'Edit_piece',
    DELETE_PIECE = 'Delete_piece',
    SET_PIECES = 'Get_pieces';

export type SetPiecesAction = {
    type: typeof SET_PIECES,
    pieces: Piece[],
}

export type SetPieceAction = {
    type: typeof SET_PIECE,
    piece: Piece,
}

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
} ;

export type TogglePieceNotifsAction = {
    type: typeof TOGGLE_PIECE_NOTIFS,
    id: number,
};

export type EditPieceAction = {
    type: typeof EDIT_PIECE,
    piece: PieceBase,
};

export type DeletePieceAction = {
    type: typeof DELETE_PIECE,
    id: number,
};

export const addPiece = (piece: Piece): AddPieceAction => ({ type: ADD_PIECE, piece }),
    setPiece = (piece: Piece): SetPieceAction => ({ type: SET_PIECE, piece }),
    editPiece = (piece: PieceBase): EditPieceAction => ({ type: EDIT_PIECE, piece }),
    togglePieceFav = (id: number): TogglePieceFavAction => ({ type: TOGGLE_PIECE_FAV, id }),
    togglePieceNotifs = (id: number): TogglePieceNotifsAction => ({ type: TOGGLE_PIECE_NOTIFS, id }),
    deletePiece = (id: number): DeletePieceAction => ({ type: DELETE_PIECE, id }),
    setPieces = (pieces: Piece[]): SetPiecesAction => ({ type: SET_PIECES, pieces }),
    setPiecesMeta = (pieces: PieceBase[]): SetPiecesMetaAction => ({ type: SET_PIECES_META, pieces });

export type PieceActionTypes = AddPieceAction
    | SetPiecesMetaAction
    | SetPieceAction
    | EditPieceAction
    | TogglePieceNotifsAction
    | TogglePieceFavAction
    | DeletePieceAction
    | SetPiecesAction;
