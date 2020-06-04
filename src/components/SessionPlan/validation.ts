import { store } from "../../store/appReducers";
import { CheckResult } from "../../types/CheckResult";
import { SessionPlan } from "../../types/plan";

export const validatePlan = (plan: SessionPlan): CheckResult => {
    if (plan.name === '') {
        return { valid: false, errors: 'You forgot to enter plan name' };
    }

    if (plan.schedule.length === 0) {
        return { valid: false, errors: 'You forgot to add activities' };
    }

    const plans = store.getState().plans.items;

    if (plans.find(item => item.name === plan.name && item.id !== plan.id)) {
        return {
            valid: false,
            errors: 'A plan with the same name already exists!'
        }
    }

    return { valid: true };
};
