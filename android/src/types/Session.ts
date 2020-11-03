import { SessionActivity } from "./activity";

export type Session = {
    id: number,
    history: SessionActivity[],
    planId?: number;
    startedOn: Date,
    isTimeout?: boolean,
};
