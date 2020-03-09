export type Piece = {
    name: string,
    timeSpent: number,

    notificationsOn: boolean,
    notificationsInterval: number,

    complexity?: PieceComplexity,
    status?: PieceStatus,
    tags?: string[],

    authors?: string[],
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
