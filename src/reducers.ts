import { combineReducers } from "redux";
import {
    ADD_PIECE,
    ADD_PLAN,
    DELETE_PIECE,
    DELETE_PLAN,
    EDIT_PIECE,
    EDIT_PLAN_SCHEDULE,
    EditPieceAction,
    EditPlanScheduleAction,
    PieceActionTypes,
    PlanActionTypes,
    RENAME_PLAN,
    RenamePlanAction
} from "./actions";
import { initialState } from "./StoreState";
import { Piece } from "./types/Piece";
import { SessionPlan } from "./types/SessionPlan";

const plans = (state: SessionPlan[] = initialState.plans, action: PlanActionTypes): SessionPlan[] => {
    switch (action.type) {
        case ADD_PLAN:
            return [...state, action.plan];
        case EDIT_PLAN_SCHEDULE:
            return editPlanSchedule(state, action);
        case RENAME_PLAN:
            return renamePlan(state, action);
        case DELETE_PLAN:
            return state.filter(p => p.id !== action.id);
        default:
            return state;
    }
};

const pieces = (state: Piece[] = initialState.pieces, action: PieceActionTypes): Piece[] => {
    switch (action.type) {
        case ADD_PIECE:
            return [...state, action.piece];
        case DELETE_PIECE:
            return state.filter(p => p.id !== action.id);
        case EDIT_PIECE:
            return replacePiece(state, action);
        default:
            return state;
    }
};

const replacePiece = (state: Piece[], action: EditPieceAction): Piece[] => {
    const pieces = state.filter(i => i.id !== action.piece.id);
    pieces.push(action.piece);

    return pieces;
};

const editPlanSchedule = (state: SessionPlan[], action: EditPlanScheduleAction): SessionPlan[] => {
    const plans = state.filter(i => i.id !== action.plan.id);
    plans.push(action.plan);

    return plans;
};

const renamePlan = (state: SessionPlan[], action: RenamePlanAction): SessionPlan[] => {
    const plans = state.filter(i => i.id !== action.id),
        planToRename = state.find(i => i.id === action.id);

    if (planToRename === undefined) {
        throw new Error('plan with such id doesn\'t exist');
    }

    const renamed = new SessionPlan(action.id, action.name, planToRename.schedule);
    plans.push(renamed);

    return plans;
};

export const practiceManagerApp = combineReducers({ plans, pieces });
