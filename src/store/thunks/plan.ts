import { Dispatch } from "redux";
import { addPlan as addPlanToDb, deletePlan as deletePlanFromDb, getPlans } from "../../db/plan";
import { SessionPlan } from "../../types/SessionPlan";
import { addPlan, deletePlan, setPlans } from "../actions";
import { ThunkResult } from "./ThunkResult";

export const thunkGetPlans: ThunkResult = () => async (dispatch: Dispatch) =>
    await getPlans()
        .then((plans) => dispatch(setPlans(plans)));

export const thunkAddPlan: ThunkResult = (plan: SessionPlan) => async (dispatch: Dispatch) =>
    await addPlanToDb(plan)
        .then((id) => dispatch(addPlan({ ...plan, id })));

export const thunkDeletePlan: ThunkResult = (id: number) => async (dispatch: Dispatch) =>
    await deletePlanFromDb(id)
        .then(() => dispatch(deletePlan(id)));

