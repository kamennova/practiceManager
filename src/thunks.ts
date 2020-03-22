import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { addPiece, setPieces } from "./actions";
import { addPiece as addPieceToDb, getPieces } from "./backend/db";
import { StateShape } from "./StoreState";
import { Piece } from "./types/Piece";

export type ThunkResult = ActionCreator<ThunkAction<Promise<Action>, StateShape, void, Action<void>>>;

export const thunkGetPieces: ThunkResult =
    () => async (dispatch: Dispatch) => {
        const pieces = await getPieces();

        return dispatch(setPieces(pieces));
    };

export const thunkAddPiece: ThunkResult =
    (piece: Piece) => async (dispatch: Dispatch) => {
        await addPieceToDb(piece);

        return dispatch(addPiece(piece));
    };
