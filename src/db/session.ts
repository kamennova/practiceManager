import { SessionActivity } from "../types/activity";
import { Session } from "../types/Session";
import { activityFromRow, insertActivity } from "./activity";
import { executeSql } from "./common";
import { rowToSession } from "./RowTransform";

export const addSessionToDb = async (session: Session): Promise<void> => {
    await insertSession(session)
        .then((sessionId) => insertHistory(session.history, sessionId));
};

const insertSession = async (session: Session): Promise<number> =>
    await executeSql('INSERT INTO Sessions (planId, startedOn) VALUES (?, ?)',
        [
            session.planId !== undefined ? session.planId : null,
            session.startedOn.getSeconds(),
        ]).then(({ insertId }) => insertId);

const insertHistory = async (history: SessionActivity[], sessionId: number) =>
    await Promise.all([
        history.map((act, i) => insertActivity(act, i)
            .then(({ insertId }) => insertSessionActivity(insertId, sessionId))
        )]);

const insertSessionActivity = (actId: number, sessionId: number) =>
    executeSql('INSERT INTO SessionActivities (activityId, sessionId) VALUES (?, ?)',
        [actId, sessionId]);

export const getSessions = async (): Promise<Session[]> => {
    const sessions: Session[] = await executeSql('SELECT * FROM Sessions')
    // @ts-ignore
        .then(({ rows }) => rows._array.map(rowToSession));

    return await Promise.all(
        sessions.map(
            session => fetchSessionHistory(session.id).then(history => ({ ...session, history }))
        ));
};

const fetchSessionHistory = (sessionId: number): Promise<SessionActivity[]> => executeSql(
        `SELECT Activities.*
         FROM SessionActivities
                LEFT JOIN Activities ON SessionActivities.activityId = Activities.id
         WHERE SessionActivities.sessionId = ?`,
    [sessionId])
// @ts-ignore
    .then(({ rows }) => rows._array.map(activityFromRow));
