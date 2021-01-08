import { ActivityRecord } from "../types/activity";
import { EmptyPiece, Piece, PieceBase } from "../types/piece";
import { EmptyPlan, SessionPlan } from "../types/plan";
import { Session } from "../types/Session";

export type ItemsShape<T, META> = {
    items: META[],
    totalCount: number,
    currentItem: T,
    lastAddedId?: number,
};

export type SessionsShape = {
    items: Session[],
    current: SessionState,
    totalCount: number,
};

export type SessionState = {
    isOn: boolean,
    finishedOn?: number,
    planId?: number,
    history: ActivityRecord[],
    isTimeout?: boolean,
};

export type StateShape = {
    pieces: ItemsShape<Piece, PieceBase>,
    plans: ItemsShape<SessionPlan, SessionPlan>,
    sessions: SessionsShape,
};

export const initialState: StateShape = {
    pieces: { items: [], currentItem: EmptyPiece, totalCount: 0, },
    plans: { items: [], currentItem: EmptyPlan, totalCount: 0, },
    sessions: { items: [], totalCount: 0, current: { isOn: false, history: [] }, },
};
