export type BaseActivity = {
    type: ActivityType,
}

export type TechniqueActivity = BaseActivity & {
    type: ActivityType.Technique,
    exercise?: Exercise,
    tonality?: Tonality,
};

export type PieceActivity = BaseActivity & {
    type: ActivityType.SightReading | ActivityType.Piece,
    pieceId?: number,
}

export type BreakActivity = BaseActivity & { type: ActivityType.Break };

export type Activity = BreakActivity | TechniqueActivity | PieceActivity;

export enum ActivityType {
    Piece = 'Piece',
    Technique = 'Technique',
    Break = 'Break',
    SightReading = 'Sight reading'
}

export type ComplexActivityType = ActivityType.Technique | ActivityType.Piece | ActivityType.SightReading;

export enum Exercise {
    'Scales',
    'Arpeggio',
    'Chords',
    'Other',
}

export type Tonality = 'C#/D♭' | 'C' | 'D'; // todo
