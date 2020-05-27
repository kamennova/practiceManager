import { ActivityType } from "./Activity";
import { PlanActivity } from "./plan";

export type ActivitiesReport = {
    totalDuration: number,
    pieces: number,
    technique: number,
    break: number,
    sightReading: number,
};

export const getActivitiesReport = (activities: PlanActivity[]): ActivitiesReport => ({
    totalDuration: totalDuration(activities),
    pieces: piecesDuration(activities),
    technique: techniqueDuration(activities),
    sightReading: sightReadingDuration(activities),
    break: breakDuration(activities),
});

const sumActivitiesDuration = (activities: PlanActivity[]): number => {
    let sum: number = 0;

    activities.forEach(activity => sum += activity.duration);

    return sum;
};

export const totalDuration = (activities: PlanActivity[]): number => sumActivitiesDuration(activities);

export const sightReadingDuration = (activities: PlanActivity[]): number =>
    sumActivitiesDuration(activities.filter(act => act.type === ActivityType.SightReading));

export const breakDuration = (activities: PlanActivity[]): number =>
    sumActivitiesDuration(activities.filter(act => act.type === ActivityType.Break));

export const piecesDuration = (activities: PlanActivity[]): number =>
    sumActivitiesDuration(activities.filter(act => act.type === ActivityType.Piece));

export const techniqueDuration = (activities: PlanActivity[]): number =>
    sumActivitiesDuration(activities.filter(act => act.type === ActivityType.Technique));
