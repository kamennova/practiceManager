import { getRepository } from "typeorm";
import { ActivityType, Exercise, PieceDetails, TechniqueDetails, Tonality } from "../types/Activity";
import { PlanActivity } from "../types/PlanActivity";
import { ActivityEntity } from "./entity/activity/Activity";
import { IActivity } from "./entity/activity/IActivity";
import { PieceActivityDetailsEntity } from "./entity/activity/PieceActivity";
import { TechniqueActivityDetailsEntity } from "./entity/activity/TechniqueActivity";

export const createActivity = async (activity: PlanActivity, order: number): Promise<number> => {
    const newAct = new ActivityEntity();
    newAct.duration = activity.duration;
    newAct.order = order;
    newAct.type = activity.type;

    if (activity.type === ActivityType.Technique) {
        newAct.detailsId = await createTechniqueActivityDetails(activity.exercise, activity.tonality);
    } else if (activity.type === ActivityType.Piece || activity.type === ActivityType.SightReading) {
        newAct.detailsId = await createPieceActivityDetails(activity.pieceId);
    } else {
        newAct.detailsId = null;
    }

    const repo = getRepository(ActivityEntity);
    await repo.save(newAct);

    return newAct.id;
};

export const getActivity = async (id: number) => {
    const repo = getRepository(ActivityEntity);

    const activity = await repo.findOne(id);

    if (activity === undefined) {
        throw new Error('Not found');
    }

    return await activityFromEntity(activity);
};

const createPieceActivityDetails = async (pieceId?: number): Promise<number> => {
    const pieceAct = new PieceActivityDetailsEntity();
    pieceAct.pieceId = pieceId !== undefined ? pieceId : null;

    const repo = getRepository(PieceActivityDetailsEntity);
    await repo.save(pieceAct);

    return pieceAct.id;
};

const createTechniqueActivityDetails = async (exercise?: Exercise, tonality?: Tonality): Promise<number> => {
    const act = new TechniqueActivityDetailsEntity();
    act.exercise = exercise !== undefined ? exercise.toString() : null;
    act.tonality = tonality !== undefined ? tonality.toString() : null;

    const repo = getRepository(TechniqueActivityDetailsEntity);
    await repo.save(act);

    return act.id;
};

const activityFromEntity = async (ent: IActivity): Promise<PlanActivity> => {
    const type = ent.type as ActivityType;

    switch (type) {
        case ActivityType.Break:
            return { type, duration: ent.duration };
        case ActivityType.SightReading :
        case ActivityType.Piece:
            return {
                type,
                duration: ent.duration, ...(ent.detailsId !== null ? await getPieceDetails(ent.detailsId) : {})
            };
        case ActivityType.Technique:
            return {
                type,
                duration: ent.duration, ...(ent.detailsId !== null ? await getTechniqueDetails(ent.detailsId) : {})
            };
    }
};

const getPieceDetails = async (id: number): Promise<PieceDetails> => {
    const repo = getRepository(PieceActivityDetailsEntity);
    const details = await repo.findOne(id);

    if (details === undefined) {
        throw new Error('Not found');
    }

    return { pieceId: details.pieceId !== null ? details.pieceId : undefined };
};

const getTechniqueDetails = async (id: number): Promise<TechniqueDetails> => {
    const repo = getRepository(TechniqueActivityDetailsEntity);
    const details = await repo.findOne(id);

    if (details === undefined) {
        throw new Error('Not found');
    }

    return {
        tonality: details.tonality !== null ? Tonality[details.tonality] as Tonality : undefined,
        exercise: details.exercise !== null ? details.exercise as Exercise : undefined,
    };
};
