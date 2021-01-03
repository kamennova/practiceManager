import { SessionState, StateShape } from 'common/store/StoreState';
import * as React from "react";
import { connect } from "react-redux";
import { FreeSessionScreen } from "../components/tracker/FreeSessionScreen";

const Practice = (props: { session: SessionState }) => {
    return (
        <FreeSessionScreen />
    );
};

const mapStateToProps = (state: StateShape) => ({
    session: state.sessions.current,
});

export default connect(mapStateToProps)(Practice);
