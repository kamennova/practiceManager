import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { addPiece, editPiece, setPiece, setPieces, setPiecesMeta, updateLastAddedPiece } from "./actions";
import { addPiece as addPieceToDb, getPieceById, getPieces, getPiecesMeta, updatePiece } from "../db/db";
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
    const added = await addPieceToDb(piece);

    dispatch(updateLastAddedPiece(added.id));
    return dispatch(addPiece(added));
};

export const thunkEditPiece: ThunkResult = (piece: Piece) => async (dispatch: Dispatch) => {
    await updatePiece(piece);

    dispatch(updateLastAddedPiece(piece.id));
    return dispatch(editPiece(piece));
};
