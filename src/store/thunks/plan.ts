import { Dispatch } from "redux";
import { addPlanToDb, deletePlanFromDb, getPlans, togglePlanIsFavourite, updatePlan } from "../../db/plan";
import { SessionPlan } from "../../types/plan";
import { addPlan, deletePlan, editPlan, setPlans, togglePlanFav } from "../actions";
import { ThunkResult } from "./ThunkResult";

export const thunkGetPlans: ThunkResult = () => async (dispatch: Dispatch) =>
    await getPlans()
        .then((plans) => dispatch(setPlans(plans)));

export const thunkAddPlan: ThunkResult = (plan: SessionPlan) => async (dispatch: Dispatch) =>
    await addPlanToDb(plan)
        .then((id) => dispatch(addPlan({ ...plan, id })));

export const thunkEditPlan: ThunkResult = (plan: SessionPlan) => async (dispatch: Dispatch) =>
    await updatePlan(plan)
        .then(() => dispatch(editPlan(plan)));

export const thunkDeletePlan: ThunkResult = (id: number) => async (dispatch: Dispatch) =>
    await deletePlanFromDb(id)
        .then(() => dispatch(deletePlan(id)));

export const thunkTogglePlanFav: ThunkResult = (id: number) => async (dispatch: Dispatch) =>
    await togglePlanIsFavourite(id).then(() => dispatch(togglePlanFav(id)));

