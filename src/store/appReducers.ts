import { combineReducers } from "redux";
import { pieces } from "./reducers/piece";
import { plans } from "./reducers/plan";
import { sessions } from "./reducers/session";

export const practiceManagerApp = combineReducers({ plans, pieces, sessions });
