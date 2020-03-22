import { Piece } from "./types/Piece";
import { SessionPlan } from "./types/SessionPlan";

export type StateShape = {
    pieces: Piece[],
    plans: SessionPlan[],
};

export const initialState: StateShape = {
    pieces: [],
    plans: [],
};
