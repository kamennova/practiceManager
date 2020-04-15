import { Activity, ActivityType, Exercise, Tonality } from "./Activity";
import { PlanActivity } from "./PlanActivity";

export type NoBreakActivity = ActivityType.Technique | ActivityType.SightReading | ActivityType.Piece;

export type NoBreakActivityInput = {
    type: NoBreakActivity,
    exercise?: Exercise,
    tonality?: Tonality,
    pieceId?: number,
};

export type PlanActivityInput = {
    type: ActivityType,
    duration: number,
    exercise?: Exercise,
    tonality?: Tonality,
    pieceId?: number,
};

export const getPlanActivity = (act: PlanActivityInput): PlanActivity => {
    switch (act.type) {
        case ActivityType.Break:
            return { type: ActivityType.Break, duration: act.duration };
        case ActivityType.Piece:
        case ActivityType.SightReading:
            return { type: act.type, pieceId: act.pieceId, duration: act.duration };
        case ActivityType.Technique:
            return { type: act.type, exercise: act.exercise, tonality: act.tonality, duration: act.duration };
    }
};

export const getActivity = (act: NoBreakActivityInput): Activity => {
    switch (act.type) {
        case ActivityType.Piece:
        case ActivityType.SightReading:
            return { type: act.type, pieceId: act.pieceId };
        case ActivityType.Technique:
            return { type: act.type, exercise: act.exercise, tonality: act.tonality };
    }
};
