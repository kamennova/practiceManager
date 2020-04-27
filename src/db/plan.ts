import { getRepository } from "typeorm";
import { ActivityType, Exercise, Tonality } from "../types/Activity";
import { EmptyPlan } from "../types/EmptyPlan";
import { PlanActivity } from "../types/PlanActivity";
import { SessionPlan, SessionSchedule } from "../types/SessionPlan";
import {
    PieceActivityDetailsEntity,
    PlanActivityEntity,
    PlanEntity,
    TechniqueActivityDetailsEntity
} from "./entity/plan";

export const addPlan = async (plan: SessionPlan): Promise<number> => {
    const newPlan = new PlanEntity();
    newPlan.name = plan.name;
    newPlan.createdOn = Date.now();
    newPlan.isFavourite = plan.isFavourite;
    newPlan.schedule = createSchedule(plan.schedule);

    const repo = getRepository(PlanEntity);
    await repo.save(newPlan);

    return newPlan.id;
};

export const createSchedule = (schedule: SessionSchedule): PlanActivityEntity[] =>
    schedule.map((item, i) => createActivity(item, i));

export const createActivity = (activity: PlanActivity, order: number) => {
    const newAct = new PlanActivityEntity();
    newAct.duration = activity.duration;
    newAct.order = order;
    newAct.type = activity.type;

    if (activity.type === ActivityType.Technique) {
        newAct.details = createTechniqueActivityDetails(activity.exercise, activity.tonality);
    } else if (activity.type === ActivityType.Piece || activity.type === ActivityType.SightReading) {
        newAct.details = createPieceActivityDetails(activity.pieceId);
    } else {
        newAct.details = null;
    }

    return newAct;
};

const createPieceActivityDetails = (pieceId?: number) => {
    const pieceAct = new PieceActivityDetailsEntity();
    pieceAct.pieceId = pieceId !== undefined ? pieceId : null;

    return pieceAct;
};

const createTechniqueActivityDetails = (exercise?: Exercise, tonality?: Tonality) => {
    const act = new TechniqueActivityDetailsEntity();
    act.exercise = exercise !== undefined ? exercise.toString() : null;
    act.tonality = tonality !== undefined ? tonality.toString() : null;

    return act;
};

export const getPlans = async (): Promise<SessionPlan[]> => {
    const repo = getRepository(PlanEntity);

    return (await repo.find()).map(planFromEntity);
};

const planFromEntity = (ent: PlanEntity): SessionPlan => ({
    id: ent.id,
    name: ent.name,
    schedule: ent.schedule.map(activityFromEntity),
    isFavourite: ent.isFavourite !== null ? ent.isFavourite : false,
    createdOn: ent.createdOn,
});

const activityFromEntity = (ent: PlanActivityEntity): PlanActivity => {
    const type = ent.type as ActivityType;
    const details = ent.details !== null ? ent.details : undefined;

    switch (type) {
        case ActivityType.Break:
            return { type, duration: ent.duration };
        case ActivityType.SightReading :
        case ActivityType.Piece:
            return { type, duration: ent.duration, pieceId: details?.pieceId };
        case ActivityType.Technique:
            return { type, duration: ent.duration, exercise: details?.exercise, tonality: details?.tonality };
    }
};

export const getPlanById = async (_: number) => {
  return Promise.resolve(EmptyPlan);
};

export const deletePlan = async (id: number): Promise<void> => {
    const repo = getRepository(PlanEntity);
    const plan = await repo.findOne({ id });

    if (plan === undefined) {
        return await Promise.reject('plan not found, id: ' + id);
    }

    await repo.remove(plan);
};
