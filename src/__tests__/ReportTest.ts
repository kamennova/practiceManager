import { getActivitiesReport } from "../types/activity/ActivitiesReport";
import { ActivityType } from "../types/activity/Activity";
import { PlanActivity } from "../types/activity/SessionActivity";

it('activities report test', () => {
    const activities = [
        { type: ActivityType.Piece, duration: 30 },
        { type: ActivityType.SightReading, duration: 120 },
        { type: ActivityType.Piece, duration: 50 },
        { type: ActivityType.Technique, duration: 100 },
        { type: ActivityType.Technique, duration: 300 },
        { type: ActivityType.Piece, duration: 650 },
    ] as PlanActivity[];

    const report = getActivitiesReport(activities);
    expect(report.technique).toBe(400);
    expect(report.sightReading).toBe(120);
    expect(report.pieces).toBe(730);
    expect(report.break).toBe(0);
    expect(report.totalDuration).toBe(1250);
});
