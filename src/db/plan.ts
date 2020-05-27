import { getRepository } from "typeorm";
import { PlanActivity, SessionPlan } from "../types/plan";
import { createActivity, getActivity } from "./activity";
import { IActivity } from "./entity/activity/IActivity";
import { PlanActivityEntity, PlanEntity } from "./entity/plan";

export const addPlan = async (plan: SessionPlan): Promise<number> => {
    const newPlan = new PlanEntity();
    newPlan.name = plan.name;
    newPlan.createdOn = Date.now();
    newPlan.isFavourite = plan.isFavourite;
    newPlan.schedule = await createSchedule(plan.schedule);

    const repo = getRepository(PlanEntity);
    await repo.save(newPlan);

    return newPlan.id;
};

const createSchedule = async (schedule: PlanActivity[]): Promise<PlanActivityEntity[]> =>
    await Promise.all(schedule.map((item, i) => createPlanActivity(item, i)));

const createPlanActivity = async (activity: PlanActivity, order: number): Promise<PlanActivityEntity> => {
    const activityId = await createActivity(activity, order);

    const planAct = new PlanActivityEntity();
    planAct.activityId = activityId;

    return planAct;
};

export const getPlans = async (): Promise<SessionPlan[]> => {
    const repo = getRepository(PlanEntity);
    const entities = await repo.find();

    return await Promise.all(entities.map(planFromEntity));
};

const planFromEntity = async (ent: PlanEntity): Promise<SessionPlan> => ({
    id: ent.id,
    name: ent.name,
    schedule: await getSchedule(ent.schedule),
    isFavourite: ent.isFavourite !== null ? ent.isFavourite : false,
    createdOn: ent.createdOn,
});

// sort?
const getSchedule = async (schedule: IActivity[]) =>
    await Promise.all(schedule.map(item => getActivity(item.activityId)));

export const togglePlanIsFavourite = async (id: number): Promise<void> => {
    const repo = getRepository(PlanEntity);
    const planUpd = await repo.findOne(id);

    if (planUpd === undefined) {
        return await Promise.reject('Item not found, id: ' + id);
    }

    planUpd.isFavourite = !planUpd.isFavourite;
    await repo.save(planUpd);
};

export const getPlanEntity = async (id: number): Promise<PlanEntity> => {
    const repo = getRepository(PlanEntity);
    const plan = await repo.findOne({ id });

    if (plan === undefined) {
        return await Promise.reject('plan not found, id: ' + id);
    }

    return Promise.resolve(plan);
};

export const getPlanById = async (id: number): Promise<SessionPlan> =>
    Promise.resolve(planFromEntity(await getPlanEntity(id)));

export const updatePlan = async (plan: SessionPlan): Promise<void> => {
    const ent = await getPlanEntity(plan.id);
    ent.name = plan.name;
    ent.schedule = await createSchedule(plan.schedule);

    const repo = getRepository(PlanEntity);
    await repo.save(ent);
};

export const deletePlan = async (id: number): Promise<void> => {
    const repo = getRepository(PlanEntity);
    const plan = await getPlanEntity(id);

    await repo.remove(plan);
};
