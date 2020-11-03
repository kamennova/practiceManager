import { Dispatch } from "redux";
import { IDatabase } from "../../types/IDatabase";
import { INotificationService } from "../../types/INotificationService";
import { Piece } from "../../types/piece";
import { addPiece, deletePiece, editPiece, setPiecesMeta, togglePieceFav, } from "../actions";
import { ThunkResult } from "./ThunkResult";

    const tGetPiecesMeta: ThunkResult = () => async (dispatch: Dispatch) => {
        const pieces = await connectToDb().then(db => db.getPiecesMeta());
        console.log('get pieces');

        return dispatch(setPiecesMeta(pieces));
    };

    const tAddPiece: ThunkResult = (piece: Piece) => async (dispatch: Dispatch) => {
        const id = await connectToDb().then(db => db.addPiece(piece));
        const addedPiece = { ...piece, id };

        if (piece.notifsOn) {
            await notifs.schedulePieceNotif(addedPiece);
        }

        return dispatch(addPiece(addedPiece));
    };

    const tEditPiece: ThunkResult = (piece: Piece) => async (dispatch: Dispatch) => {
        return await connectToDb().then(db => db.updatePiece(piece))
            .then(() => dispatch(editPiece(piece)));
    };

    const tTogglePieceFav: ThunkResult = (id: number) => async (dispatch: Dispatch) => {
        await connectToDb().then(db => db.toggleIsFavourite(id));

        return dispatch(togglePieceFav(id));
    };

    const tDeletePiece: ThunkResult = (pieceId: number) => async (dispatch: Dispatch) => {
        const db = await connectToDb();

        return await db.getNotificationId(pieceId)
            .then((notifId) => Promise.all([
                db.deletePiece(pieceId),
                notifs.cancelNotifIfSet(notifId)]))
            .then(() => dispatch(deletePiece(pieceId)));
    };

    return { tGetPiecesMeta, tAddPiece, tEditPiece, tTogglePieceFav, tDeletePiece }
};
