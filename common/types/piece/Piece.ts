import { Item } from "../item/Item";
import { Note } from "../Note";
import { Recording } from "./Recording";

export type PieceBase = Item & {
    tags: string[],
    author?: string,
    imageUri?: string,
    timeSpent: number,
    lastPracticedOn?: Date,
    status: PieceStatus,
    mood?: PieceMood,
    complexity?: PieceComplexity,
    genre?: PieceGenre,
};

export type Piece = PieceBase & {
    notifsOn: boolean,
    notifsInterval: number,
    notifId: number | null,
    notes: Note[],
    recordings: Recording[],
    originalUri?: string,
};

export enum PieceStatus {
    NotStarted = 'Not started',
    InWork = 'In work',
    Fluent = 'Fluent',
}

export enum PieceComplexity {
    Easy = 'Easy',
    Intermediate = 'Intermediate',
    UpperIntermediate = 'UpperIntermediate',
    Advanced = 'Advanced',
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

export enum PieceMood {
    Cheerful = 'Cheerful',
    Sad = 'Sad',
    Mixed = 'Mixed'
}
