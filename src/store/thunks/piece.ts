import { Dispatch } from "redux";
import {
    addPiece as addPieceToDb,
    deletePiece as deletePieceFromDb, getNotificationId,
    getPieceById,
    getPieces,
    getPiecesMeta,
    togglePieceIsFavourite,
    updatePiece
} from "../../db/piece";
import { cancelNotifIfSet, schedulePieceNotif } from "../../notifications";
import { Piece } from "../../types/Piece";
import {
    addPiece,
    deletePiece,
    editPiece,
    setPiece,
    setPieces,
    setPiecesMeta,
    togglePieceFav,
} from "../actions/piece";
import { ThunkResult } from "./ThunkResult";

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
    const id = await addPieceToDb(piece);
    const addedPiece = { ...piece, id };

    if (piece.notifsOn) {
        await schedulePieceNotif(addedPiece);
    }

    return dispatch(addPiece(addedPiece));
};

export const thunkEditPiece: ThunkResult = (piece: Piece) => async (dispatch: Dispatch) => {
    return await updatePiece(piece)
        .then(() => dispatch(editPiece(piece)));
};

export const thunkTogglePieceFav: ThunkResult = (id: number) => async (dispatch: Dispatch) => {
    await togglePieceIsFavourite(id);

    return dispatch(togglePieceFav(id));
};

export const thunkDeletePiece: ThunkResult = (pieceId: number) => async (dispatch: Dispatch) =>
    await getNotificationId(pieceId)
        .then((notifId) => Promise.all([
            deletePieceFromDb(pieceId),
            cancelNotifIfSet(notifId)]))
        .then(() => dispatch(deletePiece(pieceId)));
