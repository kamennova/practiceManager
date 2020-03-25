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
    RenamePlanAction, SET_PIECES, UPDATE_LAST_ADDED_PIECE
} from "./actions";
import { initialState, ItemsShape } from "./StoreState";
import { Piece } from "../types/Piece";
import { SessionPlan } from "../types/SessionPlan";

const plans = (state: ItemsShape<SessionPlan> = initialState.plans, action: PlanActionTypes): ItemsShape<SessionPlan> => {
    switch (action.type) {
        case ADD_PLAN:
            return { lastAddedId: state.lastAddedId, items: [...state.items, action.plan] };
        case EDIT_PLAN_SCHEDULE:
            return { lastAddedId: state.lastAddedId, items: editPlanSchedule(state.items, action) };
        case RENAME_PLAN:
            return { lastAddedId: state.lastAddedId, items: renamePlan(state.items, action) };
        case DELETE_PLAN:
            return { lastAddedId: state.lastAddedId, items: state.items.filter(p => p.id !== action.id) };
        default:
            return state;
    }
};

const pieces = (state: ItemsShape<Piece> = initialState.pieces, action: PieceActionTypes): ItemsShape<Piece> => {
    switch (action.type) {
        case ADD_PIECE:
            return { lastAddedId: state.lastAddedId, items: [...state.items, action.piece] };
        case UPDATE_LAST_ADDED_PIECE:
            return { lastAddedId: action.id, items: state.items };
        case DELETE_PIECE:
            return { lastAddedId: state.lastAddedId, items: state.items.filter(p => p.id !== action.id) };
        case EDIT_PIECE:
            return { lastAddedId: state.lastAddedId, items: replacePiece(state.items, action) };
        case SET_PIECES:
            return { lastAddedId: state.lastAddedId, items: action.pieces };
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
