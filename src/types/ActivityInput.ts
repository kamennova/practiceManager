import { ActivityType, Exercise, Tonality } from "./Activity";

export type NoBreakActivity = ActivityType.Technique | ActivityType.SightReading | ActivityType.Piece;

export type NoBreakActivityInput = {
    type: NoBreakActivity,
    exercise?: Exercise,
    tonality?: Tonality,
    pieceId?: number,
};

export type ActivityInput = NoBreakActivityInput & {
    type: ActivityType.Break | ActivityType,
};