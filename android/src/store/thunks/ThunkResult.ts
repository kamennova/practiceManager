import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { StateShape } from "../StoreState";

export type ThunkResult = ActionCreator<ThunkAction<Promise<Action>, StateShape, void, Action<void>>>;
