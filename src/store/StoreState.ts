import { ActivityRecord } from "../types/ActivityRecord";
import { EmptyPlan, SessionPlan } from "../types/plan";
import { EmptyPiece, Piece, PieceBase } from "../types/piece";

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
