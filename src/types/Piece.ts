import { Note } from "./Note";

export type Piece = {
    id: number,
    name: string,
    timeSpent: number,
    isFavourite: boolean,
    imageUri?: string,

    notifications: {
        enabled: boolean,
        interval: number,
    },

    lastPracticedOn?: Date,
    addedOn: Date,

    complexity?: PieceComplexity,
    status: PieceStatus,
    notes: Note[],
    tags: string[],
    // todo string
    authors: string[],
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
