import { Activity } from "../../types/Activity";

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
    isTimeout?: boolean,
};

export const startSession = (): StartSessionAction => ({ type: START_SESSION }),
    pushActivity = (activity: Activity): PushActivityAction => ({ type: PUSH_ACTIVITY, activity }),
    endSession = (isTimeout: boolean = false): EndSessionAction => ({ type: END_SESSION, isTimeout });

export type SessionActionType = StartSessionAction | PushActivityAction | EndSessionAction;
