import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import {
    addPiece,
    deletePiece,
    editPiece,
    setPiece,
    setPieces,
    setPiecesMeta,
    togglePieceFav,
    updateLastAddedPiece
} from "./actions";
import {
    addPiece as addPieceToDb,
    deletePiece as deletePieceFromDb,
    getPieceById,
    getPieces,
    getPiecesMeta,
    togglePieceIsFavourite,
    updatePiece
} from "../db/db";
import { StateShape } from "./StoreState";
import { Piece } from "../types/Piece";

export type ThunkResult = ActionCreator<ThunkAction<Promise<Action>, StateShape, void, Action<void>>>;

export const thunkGetPieces: ThunkResult = () => async (dispatch: Dispatch) => {
    const pieces = await getPieces();

    return dispatch(setPieces(pieces));
};

export const thunkGetPiece: ThunkResult = (id: number) => async (dispatch: Dispatch) => {
    const piece = await getPieceById(id);
    if (piece === undefined) throw new Error();

    return dispatch(setPiece(piece));
};

export const thunkGetPiecesMeta: ThunkResult = () => async (dispatch: Dispatch) => {
    const pieces = await getPiecesMeta();

    return dispatch(setPiecesMeta(pieces));
};

export const thunkAddPiece: ThunkResult = (piece: Piece) => async (dispatch: Dispatch) => {
    return await addPieceToDb(piece)
        .then((id) => dispatch(updateLastAddedPiece(id)))
        .then(() => dispatch(addPiece(piece)));
};

export const thunkEditPiece: ThunkResult = (piece: Piece) => async (dispatch: Dispatch) => {
    return updatePiece(piece)
        .then(() => dispatch(updateLastAddedPiece(piece.id)))
        .then(() => dispatch(editPiece(piece)));
};

export const thunkTogglePieceFav: ThunkResult = (id: number) => async (dispatch: Dispatch) => {
    await togglePieceIsFavourite(id);

    return dispatch(togglePieceFav(id));
};

export const thunkDeletePiece: ThunkResult = (id: number) => async (dispatch: Dispatch) => {
    await deletePieceFromDb(id);

    return dispatch(deletePiece(id));
};
