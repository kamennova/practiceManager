import { Dispatch } from "redux";
import { updatePiecePracticeDetails } from "../../db/piece";
import { addSession, getSessions } from "../../db/session";
import { ActivityType } from "../../types/Activity";
import { PlanActivity } from "../../types/plan";
import { Session } from "../../types/Session";
import { getActivitiesWithDuration } from "../../utils/activity";
import { pieceGroupBy } from "../../utils/array";
import { endSession, setSessions, updatePiecesPractice } from "../actions";
import { SessionState, StateShape } from "../StoreState";
import { ThunkResult } from "./ThunkResult";

export const thunkGetSessions: ThunkResult = () => async (dispatch: Dispatch) =>
    await getSessions().then(res => dispatch(setSessions(res)));

export const thunkEndSession: ThunkResult = (isTimeout: boolean = false) => async (dispatch: Dispatch, getState: () => StateShape) => {
    const state = getState();
    const session = getSessionFromState({ ...state.sessions.current, isTimeout, finishedOn: Date.now() });

    const piecesPractice = getPiecesPractice(session);
    await Promise.all([updatePiecesPracticeInDb(piecesPractice), addSession(session)]);

    dispatch(updatePiecesPractice(piecesPractice));

    return dispatch(endSession(session, piecesPractice));
};

const getSessionFromState = (state: SessionState): Session => {
    return {
        id: 0,
        startedOn: new Date(state.history[0].startedOn),
        history: getActivitiesWithDuration(state),
        planId: state.planId,
    };
};

const updatePiecesPracticeInDb = async (practice: { [key: number]: number }) =>
    await Promise.all(Object.keys(practice)
        .map(id => Number(id))
        .map((id) => updatePiecePracticeDetails(id, practice[id]))
    );

const getPiecesPractice = (session: Session): { [key: number]: number } => {
    const piecePractice = session.history.filter(act =>
        (act.type === ActivityType.SightReading || act.type === ActivityType.Piece) && act.pieceId !== undefined) as
        (PlanActivity & { pieceId: number })[];

    return pieceGroupBy(piecePractice);
};
