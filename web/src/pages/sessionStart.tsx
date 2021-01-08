import { useRouter } from "next/router";
import { useState } from "react";
import * as React from "react";
import { connect } from "react-redux";
import { PrimaryButton } from "../components/Button";
import { startSession } from "common/store/actions";

const start = (props: { start: () => void }) => {
    const router = useRouter();
    const [usePlan, setUsePlan] = useState(false);
    const [planId, setPlanId] = useState(undefined);

    const startSession = () => {
        props.start();
        router.push('/practice');
    };

    return (
        <div className={'main-content page'}>
            <header className={'page-header'}>
                <h2 className={'page-title'}>New session</h2>
            </header>
            <div className={'session-choice'}>
                <p>
                    <label>
                        <input checked={!usePlan} type={'radio'} id={'session-no-plan'}
                               onChange={() => setUsePlan(false)}/>No plan
                    </label>
                </p>
                <p>
                    <label>
                        <input checked={usePlan} type={'radio'} id={'session-planned'}
                               onChange={() => setUsePlan(true)}/>Plan
                    </label>
                </p>
                <PrimaryButton label={'Start'} onClick={startSession}/>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch: any) => ({
    start: () => dispatch(startSession()),
});

export default connect(undefined, mapDispatchToProps)(start);
