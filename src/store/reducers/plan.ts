import { SessionPlan } from "../../types/plan";
import { replaceItem } from "../../utils/array";
import { ADD_PLAN, DELETE_PLAN, EDIT_PLAN, PlanActionTypes, SET_PLANS } from "../actions";
import { initialState, ItemsShape } from "../StoreState";

export const plans = (state: ItemsShape<SessionPlan, SessionPlan> = initialState.plans, action: PlanActionTypes): ItemsShape<SessionPlan, SessionPlan> => {
    switch (action.type) {
        case ADD_PLAN:
            return { ...state, items: [...state.items, action.plan], lastAddedId: action.plan.id };
        case EDIT_PLAN:
            return { ...state, items: replacePlan(state.items, action.plan) };
        case DELETE_PLAN:
            return { ...state, items: state.items.filter(p => p.id !== action.id) };
        case SET_PLANS:
            return { ...state, items: action.plans };
        default:
            return state;
    }
};

const replacePlan = (items: SessionPlan[], plan: SessionPlan): SessionPlan[] =>
    replaceItem<SessionPlan>(items, plan);
