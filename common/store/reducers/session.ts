import {
    END_SESSION,
    PUSH_ACTIVITY,
    SessionActionType,
    SET_SESSIONS,
    START_SESSION,
} from "../actions";
import { initialState, SessionsShape } from "../StoreState";

export const sessions = (state: SessionsShape = initialState.sessions, action: SessionActionType): SessionsShape => {
    switch (action.type) {
        case SET_SESSIONS:
            return { ...state, items: action.sessions };
        case START_SESSION:
            return { ...state, current: { history: [], isOn: true } };
        case PUSH_ACTIVITY:
            return {
                ...state,
                current: {
                    history: [...state.current.history, { ...action.activity, startedOn: Date.now() }],
                    isOn: true
                }
            };
        case END_SESSION:
            return end(state);
        default:
            return state;
    }
};

const end = (state: SessionsShape): SessionsShape => ({
    ...state,
    current: { ...state.current, isOn: false },
});

