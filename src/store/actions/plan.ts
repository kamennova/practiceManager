import { SessionPlan } from "../../types/SessionPlan";

export const ADD_PLAN = 'Add_plan',
    EDIT_PLAN = 'Edit_plan',
    EDIT_PLAN_SCHEDULE = 'Edit_plan_schedule',
    RENAME_PLAN = 'Rename_plan',
    DELETE_PLAN = 'Delete_plan',
    TOGGLE_PLAN_FAV = 'Toggle_plan_fav',
    SET_PLANS = 'Set_plans';

export type AddPlanAction = {
    type: typeof ADD_PLAN,
    plan: SessionPlan,
};

export type RenamePlanAction = {
    type: typeof RENAME_PLAN,
    id: number,
    name: string,
};

export type EditPlanScheduleAction = {
    type: typeof EDIT_PLAN_SCHEDULE,
    plan: SessionPlan,
}

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
    editPlanSchedule = (plan: SessionPlan): EditPlanScheduleAction => ({ type: EDIT_PLAN_SCHEDULE, plan }),
    renamePlan = (id: number, name: string): RenamePlanAction => ({ type: RENAME_PLAN, id, name }),
    deletePlan = (id: number): DeletePlanAction => ({ type: DELETE_PLAN, id }),
    togglePlanFav = (id: number): TogglePlanFavAction => ({ type: TOGGLE_PLAN_FAV, id }),
    setPlans = (plans: SessionPlan[]): SetPlansAction => ({ type: SET_PLANS, plans });

export type PlanActionTypes =
    AddPlanAction
    | EditPlanAction
    | EditPlanScheduleAction
    | RenamePlanAction
    | DeletePlanAction
    | SetPlansAction;
