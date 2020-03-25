import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { addPiece, setPieces, updateLastAddedPiece } from "./actions";
import { addPiece as addPieceToDb, getPieces } from "../db/db";
import { StateShape } from "./StoreState";
import { Piece } from "../types/Piece";

export type ThunkResult = ActionCreator<ThunkAction<Promise<Action>, StateShape, void, Action<void>>>;

export const thunkGetPieces: ThunkResult = () => async (dispatch: Dispatch) => {
    const pieces = await getPieces();

    return dispatch(setPieces(pieces));
};

export const thunkAddPiece: ThunkResult = (piece: Piece) => async (dispatch: Dispatch) => {
    const added = await addPieceToDb(piece);

    dispatch(updateLastAddedPiece(added.id));
    return dispatch(addPiece(piece));
};