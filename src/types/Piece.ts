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
    status?: PieceStatus,
    notes: Note[],
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
