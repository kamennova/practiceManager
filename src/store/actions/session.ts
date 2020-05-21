import { Activity } from "../../types/Activity";
import { Session } from "../../types/Session";

export const START_SESSION = 'Start_session',
    END_SESSION = 'End_session',
    PUSH_ACTIVITY = 'Push_activity';

type StartSessionAction = {
    type: typeof START_SESSION,
};

type PushActivityAction = {
    type: typeof PUSH_ACTIVITY,
    activity: Activity,
};

type EndSessionAction = {
    type: typeof END_SESSION,
    session: Session,
};

export const startSession = (): StartSessionAction => ({ type: START_SESSION }),
    pushActivity = (activity: Activity): PushActivityAction => ({ type: PUSH_ACTIVITY, activity }),
    endSession = (session: Session): EndSessionAction => ({ type: END_SESSION, session });

export type SessionActionType = StartSessionAction | PushActivityAction | EndSessionAction;
