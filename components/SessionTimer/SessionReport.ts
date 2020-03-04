import { ComplexActivity, SimpleActivity } from "../../types/Activity";

type Report = {
    totalDuration: number
};

export const getSessionReport = (activities: (SimpleActivity | ComplexActivity)[]): Report => {
    let dur: number = 0;

    activities.forEach(act => dur += act.duration);

    return {
        totalDuration: dur,
    }
};
