import { SessionPlan } from "../../types/SessionPlan";
import {
    ADD_PLAN,
    DELETE_PLAN,
    EDIT_PLAN_SCHEDULE,
    EditPlanScheduleAction,
    PlanActionTypes,
    RENAME_PLAN, RenamePlanAction, SET_PLANS
} from "../actions";
import { initialState, ItemsShape } from "../StoreState";

export const plans = (state: ItemsShape<SessionPlan, SessionPlan> = initialState.plans, action: PlanActionTypes): ItemsShape<SessionPlan, SessionPlan> => {
    switch (action.type) {
        case ADD_PLAN:
            return { ...state, items: [...state.items, action.plan], lastAddedId: action.plan.id };
        case EDIT_PLAN_SCHEDULE:
            return { ...state, items: editPlanSchedule(state.items, action) };
        case RENAME_PLAN:
            return { ...state, items: renamePlan(state.items, action) };
        case DELETE_PLAN:
            return { ...state, items: state.items.filter(p => p.id !== action.id) };
        case SET_PLANS:
            return { ...state, items: action.plans };
        default:
            return state;
    }
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

    const renamed = { ...planToRename, name: action.name };
    plans.push(renamed);

    return plans;
};
