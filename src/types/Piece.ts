export type Piece = {
    id: number,
    name: string,
    timeSpent: number,

    notifications: {
        enabled: boolean,
        interval: number,
    },

    lastPracticedOn?: Date,
    addedOn?: Date,

    complexity?: PieceComplexity,
    status?: PieceStatus,
    tags: string[],
    authors: string[],
}

export enum PieceComplexity {
    'Beginner',
    'Intermediate',
    'UpperIntermediate',
    'Advanced',
}

export enum PieceStatus {
    'Just started',
    'In work',
    'Fluent',
}
