import { Item } from "../item/Item";
import { Note } from "../Note";
import { Recording } from "./Recording";

export type PieceBase = Item & {
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
};

export type Piece = PieceBase & {
    notifsOn: boolean,
    notifsInterval: number,
    notifId: number | null,
    notes: Note[],
    recordings: Recording[],
    originalUri?: string,
};

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
