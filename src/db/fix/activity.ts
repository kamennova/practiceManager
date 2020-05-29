import { ActivityType, Exercise, Tonality } from "../../types/Activity";
import { PlanActivity } from "../../types/plan";
import { executeSql } from "./common";
import { ActivityRow } from "./RowTypes";

export const insertActivity = (activity: PlanActivity,
                               order: number): Promise<SQLResultSet> =>
    executeSql('INSERT INTO Activities (type, duration, activityOrder, exercise, tonality, pieceId) ' +
        'VALUES (?, ?, ?, ?, ?, ?)',
        [
            activity.type,
            activity.duration,
            order,
            activityExercise(activity),
            activityTonality(activity),
            activityPieceId(activity)
        ]);

export const activityFromRow = (row: ActivityRow): PlanActivity => {
    const type = row.type as ActivityType;
    switch (type) {
        case ActivityType.Break:
            return { duration: row.duration, type };
        case ActivityType.Technique:
            return {
                duration: row.duration,
                type,
                exercise: row.exercise !== null ? row.exercise as Exercise : undefined,
                tonality: row.tonality !== null ? row.tonality as Tonality : undefined,
            };
        case ActivityType.Piece:
        case ActivityType.SightReading:
            return { duration: row.duration, type, pieceId: row.pieceId !== null ? row.pieceId : undefined };

    }
};

const activityExercise = (activity: PlanActivity) => activity.type !== ActivityType.Technique ?
    undefined : activity.exercise;
const activityTonality = (activity: PlanActivity) => activity.type !== ActivityType.Technique ?
    undefined : activity.tonality;
const activityPieceId = (activity: PlanActivity) =>
    (activity.type !== ActivityType.Piece && activity.type !== ActivityType.SightReading) ? undefined : activity.pieceId;
