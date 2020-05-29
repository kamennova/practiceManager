import { PlanActivity } from "../../types/plan";
import { Session } from "../../types/Session";
import { activityFromRow, insertActivity } from "./activity";
import { executeTx } from "./common";
import { db } from "./Db";
import { SQLTransaction } from "expo-sqlite";
import { SessionRow } from "./RowTypes";

const sessionFromRow = (row: SessionRow, history: PlanActivity[]): Session => ({
    id: row.id,
    planId: row.planId !== null ? row.planId : undefined,
    startedOn: new Date(row.startedOn),
    history,
});

export const addSessionToDb = async (session: Session): Promise<void> => {
    console.log('inserting session');
    await new Promise((resolve) =>
        db.transaction(tx => {
            insertSession(tx, session)
                .then(({ insertId }) => insertHistory(tx, session.history, insertId))
                .then(() => resolve(undefined));
        }));
};

const insertSession = (tx: SQLTransaction, session: Session): Promise<SQLResultSet> => executeTx(tx,
    'INSERT INTO Sessions (planId, startedOn) VALUES (?, ?)',
    [
        session.planId !== undefined ? session.planId : null,
        session.startedOn.getSeconds(),
    ]);

const insertHistory = (tx: SQLTransaction, history: PlanActivity[], sessionId: number) => {
    history.forEach((act, i) => insertActivity(tx, act, i)
        .then((activityRes) => insertSessionActivity(tx, activityRes.insertId, sessionId))
    );
};

const insertSessionActivity = (tx: SQLTransaction, actId: number, sessionId: number) =>
    executeTx(tx, 'INSERT INTO SessionActivities (activityId, sessionId) VALUES (?, ?)', [actId, sessionId]);
