import { Dispatch } from "redux";
import { endSession } from "../actions";
import { ThunkResult } from "./ThunkResult";

export const thunkEndSession: ThunkResult = (isTimeout: boolean = false) => async (dispatch: Dispatch) => {
    // todo save history to db??
    return dispatch(endSession(isTimeout));
};
