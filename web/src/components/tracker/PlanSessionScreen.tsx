import { Activity, ActivityType } from "common/types/activity";
import * as React from "react";
import { useState } from "react";
import { FreeSessionTimer } from "./FreeSessionTimer";
import { SessionActivityChoice } from "./SessionActivityChoice";

export const PlanSessionScreen = () => {
    const [activity, setActivity] = useState<Activity>({ type: ActivityType.Break });
    const [isChoosing, setIsChoosing] = useState(true);

    const chooseNext = (t: ActivityType) => {
        setActivity({ type: t });
        setIsChoosing(false);
    };

    return (
        <>
            {isChoosing ?
                <SessionActivityChoice onChoose={chooseNext}/> :
                <FreeSessionTimer activity={activity} onNext={() => setIsChoosing(true)}/>}
        </>
    );
};
