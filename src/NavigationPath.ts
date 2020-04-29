import { ItemName } from "./types/item/Item";

export const DASHBOARD = 'Dashboard',
    REPERTOIRE = 'Repertoire',
    PIECE = 'Piece',
    PIECE_FORM = 'PieceForm',
    SESSION_PLAN_LIST = 'SessionPlansList',
    SESSION_PLAN = 'SessionPlan',
    SESSION_PLAN_FORM = 'SessionPlanForm',
    SESSION_START = 'SessionStartScreen',
    PLANNED_SESSION_TIMER = 'PlannedSessionTimer',
    FREE_SESSION_TIMER = 'FreeSessionTimer',
    FREE_BREAK_TIMER = 'FreeBreakTimer',
    FREE_SESSION_ACTIVITY_CHOICE = 'FreeSessionActivityChoice',
    SESSION_END = 'SessionEndScreen',
    SETTINGS = 'Settings';

export const INITIAL_SCREEN = DASHBOARD;

type ItemPathsType = {[key in ItemName]: {list: string, form: string, item: string }};

export const ItemPaths: ItemPathsType = {
    piece: {
        list: REPERTOIRE,
        form: PIECE_FORM,
        item: PIECE,
    },
    plan: {
        list: SESSION_PLAN_LIST,
        form: SESSION_PLAN_FORM,
        item: SESSION_PLAN,
    }
};
