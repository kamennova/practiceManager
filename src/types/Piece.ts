import { Note } from "./Note";

export type PieceBase = {
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
    authors: string[],
};

export type Piece = PieceBase & {
    notifications: {
        enabled: boolean,
        interval: number,
    },
    notes: Note[],
}

export enum PieceComplexity {
    Easy = 'Easy',
    Intermediate = 'Intermediate',
    UpperIntermediate = 'UpperIntermediate',
    Advanced = 'Advanced',
}

export enum PieceStatus {
    NotStarted = 'Not started',
    InWork = 'In work',
    Fluent = 'Fluent',
}
