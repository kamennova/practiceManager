import { Piece } from "./types/Piece";
import { SessionPlan } from "./types/SessionPlan";

export type ItemsShape<T> = {
    items: T[],
    lastAddedId?: number,
};

export type StateShape = {
    pieces: ItemsShape<Piece>,
    plans: ItemsShape<SessionPlan>,
};

export const initialState: StateShape = {
    pieces: { items: [] },
    plans: { items: [] },
};
