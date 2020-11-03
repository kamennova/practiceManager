import { SessionState } from "../store/StoreState";
import { SessionActivity } from "../types/activity";

export const getActivitiesWithDuration = (session: SessionState): SessionActivity[] =>
    session.history.map((act, i) => ({
        ...act,
        duration: Math.floor(
            ((i !== session.history.length - 1 ? session.history[i + 1].startedOn : (session.finishedOn || 0))
                - act.startedOn) / 1000),
    }));
