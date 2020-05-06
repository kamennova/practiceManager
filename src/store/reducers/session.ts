import { getSeconds } from "../../utils/time";
import { END_SESSION, PUSH_ACTIVITY, SessionActionType, START_SESSION, } from "../actions";
import { initialState, SessionState } from "../StoreState";

export const session = (state: SessionState = initialState.session, action: SessionActionType): SessionState => {
    switch (action.type) {
        case START_SESSION:
            return { history: [], isOn: true };
        case PUSH_ACTIVITY:
            return { history: [...state.history, action.activity], isOn: true };
        case END_SESSION:
            return { ...state, isOn: false, finishedOn: getSeconds() };
        default:
            return state;
    }
};
