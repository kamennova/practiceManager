import { PlanActivity } from "./plan";

export type Session = {
    id: number,
    history: PlanActivity[],
    planId?: number;
    startedOn: Date,
};
