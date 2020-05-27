import { getRepository } from "typeorm";
import { PlanActivity } from "../types/plan";
import { Session } from "../types/Session";
import { createActivity, getActivities } from "./activity";
import { SessionEntity } from "./entity/session/Session";
import { SessionActivityEntity } from "./entity/session/SessionActivity";
import { getPlanEntity } from "./plan";

export const addSession = async (session: Session): Promise<void> => {
    const newSession = new SessionEntity();
    newSession.startedOn = session.startedOn.getSeconds();
    newSession.plan = session.planId !== undefined ? await getPlanEntity(session.planId) : null;
    newSession.history = await createSessionHistory(session.history);

    const repo = getRepository(SessionEntity);
    await repo.save(newSession);
};

const createSessionHistory = async (history: PlanActivity[]): Promise<SessionActivityEntity[]> =>
    await Promise.all(history.map((item, i) => createSessionActivity(item, i)));

const createSessionActivity = async (activity: PlanActivity, order: number): Promise<SessionActivityEntity> => {
    const actId = await createActivity(activity, order);

    const act = new SessionActivityEntity();
    act.activityId = actId;

    return act;
};

export const getSessions = async (): Promise<Session[]> => {
    const repo = getRepository(SessionEntity);
    const entities = await repo.find();

    return Promise.all(entities.map(sessionFromEntity));
};

const sessionFromEntity = async (ent: SessionEntity): Promise<Session> => ({
    id: ent.id,
    history: await getActivities(ent.history),
    startedOn: new Date(ent.startedOn),
});

export const deleteSession = async (id: number): Promise<void> => {
    const repo = getRepository(SessionEntity);
    const session = await repo.findOne(id);

    if (session !== undefined) {
        await repo.remove(session);
    }
};
