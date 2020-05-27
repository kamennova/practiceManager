import { Activity } from "../../types/Activity";
import { Session } from "../../types/Session";

export const START_SESSION = 'Start_session',
    END_SESSION = 'End_session',
    PUSH_ACTIVITY = 'Push_activity',
    SET_SESSIONS = 'Set_sessions';

type StartSessionAction = {
    type: typeof START_SESSION,
};

type PushActivityAction = {
    type: typeof PUSH_ACTIVITY,
    activity: Activity,
};

export type EndSessionAction = {
    type: typeof END_SESSION,
    session: Session,
    piecesPractice?: { [key: string]: number },
};

type SetSessionsAction = {
    type: typeof SET_SESSIONS,
    sessions: Session[],
};

export const startSession = (): StartSessionAction => ({ type: START_SESSION }),
    pushActivity = (activity: Activity): PushActivityAction => ({ type: PUSH_ACTIVITY, activity }),
    endSession = (session: Session, piecesPractice?: { [key: string]: number }): EndSessionAction => ({
        type: END_SESSION,
        session,
        piecesPractice
    }),
    setSessions = (sessions: Session[]): SetSessionsAction => ({ type: SET_SESSIONS, sessions });

export type SessionActionType = StartSessionAction | PushActivityAction | EndSessionAction | SetSessionsAction;
