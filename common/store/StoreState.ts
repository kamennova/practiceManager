import { ActivityRecord } from "../types/activity";
import { EmptyPiece, Piece, PieceBase } from "../types/piece";
import { EmptyPlan, SessionPlan } from "../types/plan";
import { Session } from "../types/Session";

export type ItemsShape<T, META> = {
    items: META[],
    currentItem: T,
    lastAddedId?: number,
};

export type SessionsShape = {
  items: Session[],
  current: SessionState,
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
    pieces: { items: [], currentItem: EmptyPiece },
    plans: { items: [], currentItem: EmptyPlan },
    sessions: { items: [], current: { isOn: false, history: [] } },
};
