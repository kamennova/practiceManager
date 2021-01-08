import { Activity, ActivityType } from "common/types/activity";
import * as React from "react";
import { useState } from "react";
import { FreeSessionTimer } from "./FreeSessionTimer";
import { SessionActivityChoice } from "./SessionActivityChoice";

export const FreeSessionScreen = () => {
    const [activity, setActivity] = useState<Activity>({ type: ActivityType.Piece });
    const [isChoosing, setIsChoosing] = useState(true);

    const chooseNext = (act: Activity) => {
        setActivity(act);
        setIsChoosing(false);
    };

    return (
        <>
            {isChoosing ?
                <SessionActivityChoice onChoose={chooseNext} value={activity}/> :
                <FreeSessionTimer activity={activity} onNext={() => setIsChoosing(true)}/>}
        </>
    );
};
