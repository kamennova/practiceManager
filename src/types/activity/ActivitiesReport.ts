import { ActivityType } from "./Activity";
import { SessionActivity } from "./SessionActivity";

export type ActivitiesReport = {
    totalDuration: number,
    pieces: number,
    technique: number,
    break: number,
    sightReading: number,
};

export const getActivitiesReport = (activities: SessionActivity[]): ActivitiesReport => ({
    totalDuration: totalDuration(activities),
    pieces: piecesDuration(activities),
    technique: techniqueDuration(activities),
    sightReading: sightReadingDuration(activities),
    break: breakDuration(activities),
});

const sumActivitiesDuration = (activities: SessionActivity[]): number => {
    let sum: number = 0;

    activities.forEach(activity => sum += activity.duration);

    return sum;
};

export const totalDuration = (activities: SessionActivity[]): number => sumActivitiesDuration(activities);

export const sightReadingDuration = (activities: SessionActivity[]): number =>
    sumActivitiesDuration(activities.filter(act => act.type === ActivityType.SightReading));

export const breakDuration = (activities: SessionActivity[]): number =>
    sumActivitiesDuration(activities.filter(act => act.type === ActivityType.Break));

export const piecesDuration = (activities: SessionActivity[]): number =>
    sumActivitiesDuration(activities.filter(act => act.type === ActivityType.Piece));

export const techniqueDuration = (activities: SessionActivity[]): number =>
    sumActivitiesDuration(activities.filter(act => act.type === ActivityType.Technique));
