import { Note } from "./Note";

export type PieceMeta = {
    id: number,
    name: string,
    timeSpent: number,
    isFavourite: boolean,
    imageUri?: string,
    lastPracticedOn?: Date,
    addedOn: Date,
    complexity?: PieceComplexity,
    status: PieceStatus,
    tags: string[],
    // todo string
    authors: string[],
};

export type Piece = PieceMeta & {
    notifications: {
        enabled: boolean,
        interval: number,
    },
    notes: Note[],
}

export enum PieceComplexity {
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    UpperIntermediate = 'UpperIntermediate',
    Advanced = 'Advanced',
}

export enum PieceStatus {
    JustStarted = 'Just started',
    InWork = 'In work',
    Fluent = 'Fluent',
}
