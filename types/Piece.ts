export type Piece = {
    name: string,
    timeSpent: number,

    complexity?: PieceComplexity,
    status?: PieceStatus,
    composers?: string[],
    arrangers?: string[],
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
