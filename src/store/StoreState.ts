import { EmptyPiece } from "../types/EmptyPiece";
import { Piece, PieceBase } from "../types/Piece";
import { SessionPlan } from "../types/SessionPlan";

export type ItemsShape<T, META> = {
    items: META[],
    currentItem: T,
    // todo rename
    lastAddedId?: number,
};

export type StateShape = {
    pieces: ItemsShape<Piece, PieceBase>,
    plans: ItemsShape<SessionPlan, SessionPlan>,
};

export const initialState: StateShape = {
    pieces: { items: [], currentItem: EmptyPiece },
    plans: { items: [], currentItem: new SessionPlan(0, '', []) },
};
