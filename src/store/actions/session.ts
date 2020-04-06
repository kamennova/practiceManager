import { ActivityRecord } from "../../types/ActivityRecord";

export const START_SESSION = 'Start_session',
    END_SESSION = 'End_session',
    PUSH_ACTIVITY = 'Push_activity';

type StartSessionAction = {
    type: typeof START_SESSION,
};

type PushActivityAction = {
    type: typeof PUSH_ACTIVITY,
    activity: ActivityRecord,
};

type EndSessionAction = {
    type: typeof END_SESSION,
};

export const startSession = (): StartSessionAction => ({ type: START_SESSION }),
    pushActivity = (activity: ActivityRecord): PushActivityAction => ({ type: PUSH_ACTIVITY, activity }),
    endSession = (): EndSessionAction => ({ type: END_SESSION });

export type SessionActionType = StartSessionAction | PushActivityAction | EndSessionAction;
