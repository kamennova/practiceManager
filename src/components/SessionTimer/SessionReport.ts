import { ActivityRecord } from "../../types/ActivityRecord";

type Report = {
    totalDuration: number,
};

export const getSessionReport = (activities: ActivityRecord[]): Report => {
    let dur: number = 0;

    return {
        totalDuration: dur,
    }
};
