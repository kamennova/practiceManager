import * as React from "react";
import { Select } from "../inputs/Select";
import { ActivityType } from 'common/types/activity';

export const SessionActivityChoice = (props: { onChoose: (t: ActivityType) => void }) => {
    return (
        <div>
            <Select options={Object.keys(ActivityType).map(s => ({ label: s }))}
                    onChange={(t) => props.onChoose(t as ActivityType)}/>
        </div>
    );
};
