import { SessionPlan } from "../../types/plan";

export const ADD_PLAN = 'Add_plan',
    EDIT_PLAN = 'Edit_plan',
    DELETE_PLAN = 'Delete_plan',
    TOGGLE_PLAN_FAV = 'Toggle_plan_fav',
    SET_PLANS = 'Set_plans';

export type AddPlanAction = {
    type: typeof ADD_PLAN,
    plan: SessionPlan,
};

export type EditPlanAction = {
    type: typeof EDIT_PLAN,
    plan: SessionPlan,
}

export type DeletePlanAction = {
    type: typeof DELETE_PLAN,
    id: number,
}

export type TogglePlanFavAction = {
    id: number,
    type: typeof TOGGLE_PLAN_FAV,
};

export type SetPlansAction = {
    type: typeof SET_PLANS,
    plans: SessionPlan[],
};

export const addPlan = (plan: SessionPlan): AddPlanAction => ({ type: ADD_PLAN, plan }),
    editPlan = (plan: SessionPlan): EditPlanAction => ({ type: EDIT_PLAN, plan }),
    deletePlan = (id: number): DeletePlanAction => ({ type: DELETE_PLAN, id }),
    togglePlanFav = (id: number): TogglePlanFavAction => ({ type: TOGGLE_PLAN_FAV, id }),
    setPlans = (plans: SessionPlan[]): SetPlansAction => ({ type: SET_PLANS, plans });

export type PlanActionTypes = AddPlanAction | EditPlanAction | DeletePlanAction | SetPlansAction;
