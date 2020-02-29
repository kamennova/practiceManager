import { Activity, ActivityType, ComplexActivity, SimpleActivity } from "./Activity";

export type SessionSchedule = (SimpleActivity | ComplexActivity)[];

export class SessionPlan {
    name: string;
    schedule: SessionSchedule; // order is important

    constructor(name: string, schedule: SessionSchedule) {
        this.name = name;
        this.schedule = schedule;
    }

    static sumDurationOfActivities(activities: Activity[]): number {
        let sum: number = 0;

        activities.forEach(activity => sum += activity.duration);

        return sum;
    }

    totalDurationInMinutes(): number {
        return SessionPlan.sumDurationOfActivities(this.schedule);
    }

    piecesDuration(): number {
        return SessionPlan.sumDurationOfActivities(this.schedule.filter(act => act.type === ActivityType.Pieces));
    }

    techniqueDuration(): number {
        return SessionPlan.sumDurationOfActivities(this.schedule.filter(act => act.type === ActivityType.Technique));
    }
}
