import { SessionState } from "../store/StoreState";
import { PlanActivity } from "../types/PlanActivity";

export const getActivitiesWithDuration = (session: SessionState): PlanActivity[] =>
    session.history.map((act, i) => ({
        ...act,
        duration: Math.floor(
            ((i !== session.history.length - 1 ? session.history[i + 1].startedOn : (session.finishedOn || 0))
                - act.startedOn) / 1000),
    }));
