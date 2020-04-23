import { SessionPlan } from "../../types/SessionPlan";

export const ADD_PLAN = 'Add_plan',
    EDIT_PLAN_SCHEDULE = 'Edit_plan_schedule',
    RENAME_PLAN = 'Rename_plan',
    DELETE_PLAN = 'Delete_plan',
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

export type DeletePlanAction = {
    type: typeof DELETE_PLAN,
    id: number,
}

export type SetPlansAction = {
    type: typeof SET_PLANS,
    plans: SessionPlan[],
};

export const addPlan = (plan: SessionPlan): AddPlanAction => ({ type: ADD_PLAN, plan }),
    editPlanSchedule = (plan: SessionPlan): EditPlanScheduleAction => ({ type: EDIT_PLAN_SCHEDULE, plan }),
    renamePlan = (id: number, name: string): RenamePlanAction => ({ type: RENAME_PLAN, id, name }),
    deletePlan = (id: number): DeletePlanAction => ({ type: DELETE_PLAN, id }),
    setPlans = (plans: SessionPlan[]): SetPlansAction => ({ type: SET_PLANS, plans });

export type PlanActionTypes =
    AddPlanAction
    | EditPlanScheduleAction
    | RenamePlanAction
    | DeletePlanAction
    | SetPlansAction;
