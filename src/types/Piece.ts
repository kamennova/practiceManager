import { Note } from "./Note";
import { Recording } from "./Recording";

export type PieceBase = {
    id: number,
    name: string,
    tags: string[],
    authors: string[],
    complexity?: PieceComplexity,
    genre?: PieceGenre,
    imageUri?: string,
    timeSpent: number,
    lastPracticedOn?: Date,
    addedOn: Date,
    status: PieceStatus,
    isFavourite: boolean,
};

export type Piece = PieceBase & {
    notifications: {
        enabled: boolean,
        interval: number,
    },
    notes: Note[],
    recordings: Recording[],
    originalUri?: string,
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

export enum PieceGenre {
    Classical = 'Classical',
    Rock = 'Rock',
    Pop = 'Pop',
    Jazz = 'Jazz',
    Country = 'Country',
    RAndB = 'R&B',
    Other = 'Other',
}
