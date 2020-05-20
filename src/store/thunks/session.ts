import { Dispatch } from "redux";
import { updatePiecePracticeDetails } from "../../db/piece";
import { ActivityType } from "../../types/Activity";
import { PlanActivity } from "../../types/PlanActivity";
import { getActivitiesWithDuration } from "../../utils/activity";
import { pieceGroupBy } from "../../utils/array";
import { endSession } from "../actions";
import { SessionState, StateShape } from "../StoreState";
import { ThunkResult } from "./ThunkResult";

export const thunkEndSession: ThunkResult = (isTimeout: boolean = false) => async (dispatch: Dispatch, getState: () => StateShape) => {
    const state = getState();

    const piecesPractice = getPiecesPractice({ ...state.session, finishedOn: Date.now() });

    await Promise.all(Object.keys(piecesPractice)
        .map(id => Number(id))
        .map((id) => updatePiecePracticeDetails(id, piecesPractice[id]))
    );

    return dispatch(endSession(isTimeout));
};

const getPiecesPractice = (session: SessionState): { [key: number]: number } => {
    const activities = getActivitiesWithDuration(session);

    const piecePractice = activities.filter(act =>
        (act.type === ActivityType.SightReading || act.type === ActivityType.Piece) && act.pieceId !== undefined) as
        (PlanActivity & { pieceId: number })[];

    return pieceGroupBy(piecePractice);
};
