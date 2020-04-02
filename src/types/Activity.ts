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

export type TechniqueTypes = 'Scales' | 'Arpeggio' | 'Chords';
export type Tonality = 'C#/D♭' | 'C' | 'D'; // todo

export type SimpleActivity = Activity & {
    type: ActivityType.WarmUp | ActivityType.Break,
};

export type ComplexActivity = Activity & (
    {
        type: ActivityType.Technique,
        schedule?: TechniqueSubActivity[],
    } |
    {
        type: ActivityType.Pieces | ActivityType.SightReading,
        schedule: PieceSubActivity[]
    });

export type SubActivity = {
    duration: number,
}

export type TechniqueSubActivity = SubActivity & {
    name: TechniqueTypes,
    tonality: Tonality,
}

export type PieceSubActivity = SubActivity & {
    pieceId: number,
}
