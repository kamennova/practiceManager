import { ActivityType } from "./Activity";
import { Item } from "./item/Item";
import { PlanActivity } from "./PlanActivity";

export type SessionSchedule = PlanActivity[];

export type SessionPlan = Item & {
    name: string;
    schedule: SessionSchedule; // order is important
    createdOn: number,
}

const sumActivitiesDuration = (activities: PlanActivity[]): number => {
    let sum: number = 0;

    activities.forEach(activity => sum += activity.duration);

    return sum;
};

export const totalDurationInMinutes = (plan: SessionPlan): number => sumActivitiesDuration(plan.schedule);

export const piecesDuration = (plan: SessionPlan): number =>
    sumActivitiesDuration(plan.schedule.filter(act => act.type === ActivityType.Piece));

export const techniqueDuration = (plan: SessionPlan): number =>
    sumActivitiesDuration(plan.schedule.filter(act => act.type === ActivityType.Technique));
