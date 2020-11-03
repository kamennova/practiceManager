import { Dispatch } from "redux";
import {
    addPieceToDb,
    deletePieceFromDb,
    getNotificationId,
    getPiecesMeta,
    toggleIsFavourite,
    updatePieceInDb
} from "../../db/piece";
import { cancelNotifIfSet, schedulePieceNotif } from "../../notifications";
import { Piece } from "../../types/piece";
import { addPiece, deletePiece, editPiece, setPiecesMeta, togglePieceFav, } from "../actions";
import { ThunkResult } from "./ThunkResult";

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
    return await updatePieceInDb(piece)
        .then(() => dispatch(editPiece(piece)));
};

export const thunkTogglePieceFav: ThunkResult = (id: number) => async (dispatch: Dispatch) => {
    await toggleIsFavourite(id);

    return dispatch(togglePieceFav(id));
};

export const thunkDeletePiece: ThunkResult = (pieceId: number) => async (dispatch: Dispatch) =>
    await getNotificationId(pieceId)
        .then((notifId) => Promise.all([
            deletePieceFromDb(pieceId),
            cancelNotifIfSet(notifId)]))
        .then(() => dispatch(deletePiece(pieceId)));
