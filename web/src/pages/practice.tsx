import { SessionState, StateShape } from 'common/store/StoreState';
import * as React from "react";
import { connect } from "react-redux";
import { FreeSessionScreen } from "../components/tracker/FreeSessionScreen";
import { PlanSessionScreen } from "../components/tracker/PlanSessionScreen";
import { SessionEndScreen } from "../components/tracker/SessionEndScreen";

const Practice = (props: { session: SessionState }) => {
    return (
        <div className={'page main-content'}>
            {props.session.isOn ?
                (props.session.planId !== undefined ? <PlanSessionScreen/> : <FreeSessionScreen/>) :
                <SessionEndScreen/>}
        </div>
    );
};

const mapStateToProps = (state: StateShape) => ({
    session: state.sessions.current,
});

export default connect(mapStateToProps)(Practice);
