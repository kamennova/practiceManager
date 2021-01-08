import { SessionPlan } from "./SessionPlan";

export const EmptyPlan: SessionPlan = {
    id: 0,
    name: '',
    schedule: [],
    addedOn: new Date(),
    isFavourite: false,
};
