import { Note } from "../types/Note";
import { Piece, PieceBase, PieceStatus } from "../types/piece";
import { SessionActivity } from "../types/activity";
import { Session } from "../types/Session";
import { NoteRow, PieceRow, SessionRow } from "./RowTypes";

export const rowToPieceBase = (row: PieceRow, tags?: string[]): PieceBase => ({
    id: row.id,
    imageUri: row.imageUri !== null ? row.imageUri : undefined,
    isFavourite: row.isFavourite !== 0,
    name: row.name,
    timeSpent: row.timeSpent,
    lastPracticedOn: row.lastPracticedOn !== null ? new Date(row.lastPracticedOn * 1000) : undefined,
    author: row.author !== null ? row.author : undefined,
    addedOn: new Date(row.addedOn),
    status: row.timeSpent > 0 ? PieceStatus.InWork : PieceStatus.NotStarted,
    tags: tags !== undefined ? tags : [],
});

export const rowToPiece = (row: PieceRow, tags: string[], notes: Note[]): Piece => ({
    ...rowToPieceBase(row, tags),
    notifsOn: row.notifsOn === 1,
    notifsInterval: row.notifsInterval,
    notifId: row.notifId,
    notes,
    recordings: [],
});

export const rowToNote = (row: NoteRow): Note => ({
    id: row.id,
    content: row.content,
    addedOn: new Date(row.addedOn * 1000),
});

export const rowToSession = (row: SessionRow, history: SessionActivity[]): Session => ({
    id: row.id,
    planId: row.planId !== null ? row.planId : undefined,
    startedOn: new Date(row.startedOn),
    history,
});
