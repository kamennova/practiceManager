import * as React from "react";
import { ActivityInput } from "../inputs/ActivityInput";
import { Activity } from 'common/types/activity';

export const SessionActivityChoice = (props: { value?: Activity, onChoose: (a: Activity) => void }) => {
    return (
        <div className={'main-content page-selection'}>
            <h2 className={'page-title'}>Select activity</h2>
            <ActivityInput onChoose={props.onChoose} act={props.value}/>
        </div>
    );
};
