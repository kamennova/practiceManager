import { combineReducers } from "redux";
import { Piece, PieceBase } from "../types/Piece";
import { SessionPlan } from "../types/SessionPlan";
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
    RenamePlanAction,
    SET_PIECE,
    SET_PIECES,
    SET_PIECES_META,
    TOGGLE_PIECE_FAV,
    TOGGLE_PIECE_NOTIFS,
} from "./actions";
import { initialState, ItemsShape } from "./StoreState";

const plans = (state: ItemsShape<SessionPlan, SessionPlan> = initialState.plans, action: PlanActionTypes): ItemsShape<SessionPlan, SessionPlan> => {
    switch (action.type) {
        case ADD_PLAN:
            return { ...state, items: [...state.items, action.plan] };
        case EDIT_PLAN_SCHEDULE:
            return { ...state, items: editPlanSchedule(state.items, action) };
        case RENAME_PLAN:
            return { ...state, items: renamePlan(state.items, action) };
        case DELETE_PLAN:
            return { ...state, items: state.items.filter(p => p.id !== action.id) };
        default:
            return state;
    }
};

const pieces = (state: ItemsShape<Piece, PieceBase> = initialState.pieces, action: PieceActionTypes): ItemsShape<Piece, PieceBase> => {
    switch (action.type) {
        case ADD_PIECE:
            return { ...state, items: [...state.items, action.piece], lastAddedId: action.piece.id };
        case DELETE_PIECE:
            return { ...state, items: state.items.filter(p => p.id !== action.id) };
        case EDIT_PIECE:
            return { ...state, items: replacePiece(state.items, action) };
        case TOGGLE_PIECE_NOTIFS:
            return state;
        case TOGGLE_PIECE_FAV:
            return { ...state, items: findAndTogglePieceFav(state.items, action.id) };
        case SET_PIECE:
            return { ...state, currentItem: action.piece };
        case SET_PIECES_META:
            return { ...state, items: action.pieces };
        case SET_PIECES:
            return { ...state, items: action.pieces };
        default:
            return state;
    }
};

const replacePiece = (state: PieceBase[], action: EditPieceAction): PieceBase[] => {
    const pieces = state.filter(i => i.id !== action.piece.id);
    pieces.push(action.piece);

    return pieces;
};

const findAndTogglePieceFav = (items: PieceBase[], id: number) => {
    const pieces = items.filter(i => i.id !== id);
    const item = items.find(i => i.id === id);

    if (item === undefined) throw new Error('piece not found');

    pieces.push({ ...item, isFavourite: !item.isFavourite });
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

    const renamed = { name: action.name, id: action.id, schedule: [] };
    plans.push(renamed);

    return plans;
};

export const practiceManagerApp = combineReducers({ plans, pieces });
