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
    Scales = 'Scales',
    Arpeggio = 'Arpeggio',
    Chords = 'Chords',
}

export enum Tonality {
    A = 'A',
    ASharp = 'A#',
    C = 'C',
    CSharp = 'C#/D♭',
    D = 'D',
    DSharp = 'D#',
    E = 'E',
    F = 'F',
    FSharp = 'F#',
    G = 'G',
    GSharp = 'G#',
}
