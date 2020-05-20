import { SessionPlan } from "../types/plan";

export const findPlanOrThrowError = (plans: SessionPlan[], planId: number) => {
    const plan = plans.find(item => item.id === planId);

    if (plan === undefined) {
        throw new Error('Plan not found');
    }

    return plan;
};
