export type Activity = {
    type: ActivityType,
    duration: number, // in minutes
}

export enum ActivityType {
    'WarmUp' = "Warm-up",
    'Pieces' = 'Pieces',
    'Technique' = 'Technique',
    'Break' = 'Break',
    'SightReading' = 'Sight reading'
}

export type SimpleActivity = Activity & {
    type: ActivityType.SightReading | ActivityType.WarmUp | ActivityType.Break,
};

export type ComplexActivity = Activity & {
    type: ComplexActivityType,
    schedule?: SubActivity[],
};

export type SubActivity = {
    name: string,
    duration: number,
    sideNote?: string
}

export type ComplexActivityType = ActivityType.Technique | ActivityType.Pieces;
