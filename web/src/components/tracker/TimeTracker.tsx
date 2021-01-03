import { ActivityType } from "common/types/activity/Activity";
import { formatSeconds } from "common/utils/time";
import React from "react";

type TimeTrackerProps = {
    seconds: number,
    activityType: ActivityType,
}

export const TimeTracker = (props: TimeTrackerProps) => {
    const hours = Math.floor(props.seconds / 3600);

    return (
        <div className={'time-display'}>
            <span>
                {hours > 0 ? formatSeconds(hours) + ':' : undefined}
                {formatSeconds(Math.floor(props.seconds / 60) % 60)}:
                {formatSeconds(props.seconds % 60)}
            </span>
        </div>
    );
};
