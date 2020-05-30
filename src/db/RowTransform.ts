import { Note } from "../types/Note";
import { Piece, PieceBase, PieceStatus } from "../types/piece";
import { PlanActivity } from "../types/plan";
import { Session } from "../types/Session";
import { NoteRow, PieceRow, SessionRow } from "./RowTypes";

export const rowToPieceBase = (row: PieceRow, tags?: string[]): PieceBase => ({
    id: row.id,
    imageUri: row.imageUri !== null ? row.imageUri : undefined,
    isFavourite: row.isFavourite !== 0,
    name: row.name,
    timeSpent: row.timeSpent,
    lastPracticedOn: row.lastPracticedOn !== null ? new Date(row.lastPracticedOn) : undefined,
    authors: row.authors !== '' ? row.authors.split(', ') : [],
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
    content: row.content,
    addedOn: new Date(row.addedOn),
});

export const rowToSession = (row: SessionRow, history: PlanActivity[]): Session => ({
    id: row.id,
    planId: row.planId !== null ? row.planId : undefined,
    startedOn: new Date(row.startedOn),
    history,
});
