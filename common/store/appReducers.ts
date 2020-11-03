import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { pieces } from "./reducers/piece";
import { plans } from "./reducers/plan";
import { sessions } from "./reducers/session";

const practiceManagerApp = combineReducers({ plans, pieces, sessions });

export const store = createStore(practiceManagerApp, applyMiddleware(thunk));
