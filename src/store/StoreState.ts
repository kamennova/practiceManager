import { ActivityRecord } from "../types/ActivityRecord";
import { EmptyPiece } from "../types/EmptyPiece";
import { EmptyPlan } from "../types/EmptyPlan";
import { Piece, PieceBase } from "../types/Piece";
import { SessionPlan } from "../types/SessionPlan";

export type ItemsShape<T, META> = {
    items: META[],
    currentItem: T,
    lastAddedId?: number,
};

export type SessionState = {
    isOn: boolean,
    finishedOn?: number,
    planId?: number,
    history: ActivityRecord[],
};

export type StateShape = {
    pieces: ItemsShape<Piece, PieceBase>,
    plans: ItemsShape<SessionPlan, SessionPlan>,
    session: SessionState,
};

export const initialState: StateShape = {
    pieces: { items: [], currentItem: EmptyPiece },
    plans: { items: [], currentItem: EmptyPlan },
    session: { isOn: false, history: [] },
};
