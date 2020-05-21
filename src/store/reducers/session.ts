import { Session } from "../../types/Session";
import { END_SESSION, PUSH_ACTIVITY, SessionActionType, START_SESSION, } from "../actions";
import { initialState, SessionsShape } from "../StoreState";

export const sessions = (state: SessionsShape = initialState.sessions, action: SessionActionType): SessionsShape => {
    switch (action.type) {
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
            return end(state, action);
        default:
            return state;
    }
};

const end = (state: SessionsShape, action: { session: Session }): SessionsShape => {
    console.log({ ...state, items: [...state.items, action.session], current: { isOn: false, history: [] } });
    return { ...state, items: [...state.items, action.session], current: { isOn: false, history: [] } };
};
