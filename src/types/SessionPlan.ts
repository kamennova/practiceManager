import { Activity, ActivityType } from "./Activity";

export type SessionSchedule = Activity[];

export type SessionPlan = {
    id: number;
    name: string;
    schedule: SessionSchedule; // order is important
}

const sumActivitiesDuration = (activities: Activity[]): number => {
    let sum: number = 0;

    activities.forEach(activity => sum += activity.duration);

    return sum;
};

export const totalDurationInMinutes = (plan: SessionPlan): number => sumActivitiesDuration(plan.schedule);

export const piecesDuration = (plan: SessionPlan): number =>
    sumActivitiesDuration(plan.schedule.filter(act => act.type === ActivityType.Piece));

export const techniqueDuration = (plan: SessionPlan): number =>
    sumActivitiesDuration(plan.schedule.filter(act => act.type === ActivityType.Technique));
