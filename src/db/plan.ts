import { SessionActivity } from "../types/activity";
import { SessionPlan } from "../types/plan";
import { activityFromRow, insertActivity } from "./activity";
import { executeSql } from "./common";
import { PlanRow } from "./RowTypes";

const planFromRow = (row: PlanRow, schedule: SessionActivity[]): SessionPlan => ({
    id: row.id,
    isFavourite: row.isFavourite === 1,
    addedOn: new Date(row.addedOn),
    name: row.name,
    schedule,
});

export const addPlanToDb = async (plan: SessionPlan): Promise<number> => {
    const planId = await insertPlan(plan);

    await insertSchedule(planId, plan.schedule);

    return planId;
};

const insertPlan = async (plan: SessionPlan): Promise<number> =>
    await executeSql('INSERT INTO Plans (name, addedOn, isFavourite) VALUES (?, ?, ?)', [
        plan.name,
        plan.addedOn,
        plan.isFavourite ? 1 : 0,
    ]).then(({ insertId }) => insertId);

const insertSchedule = async (planId: number, schedule: SessionActivity[]) => await Promise.all(
    schedule.map((act, i) =>
        insertActivity(act, i)
            .then(({ insertId }) => insertPlanActivitySql(insertId, planId))
    )
);

const insertPlanActivitySql = (actId: number, planId: number) =>
    executeSql('INSERT INTO PlanActivities (activityId, planId) VALUES (?, ?)', [actId, planId]);

export const deletePlanFromDb = async (id: number): Promise<void> => {
    await Promise.all([
        executeSql('DELETE FROM Plans WHERE id = ?', [id]),
        ...deleteSchedulePromises(id),
    ]);
};

export const togglePlanIsFavourite = async (id: number): Promise<void> => {
    await executeSql('UPDATE Plans SET isFavourite = CASE isFavourite WHEN 0 THEN 1 ELSE 0 END WHERE id = ?',
        [id]);
};

export const getPlans = async (): Promise<SessionPlan[]> => {
    const plans: SessionPlan[] = await executeSql('SELECT * FROM Plans')
    // @ts-ignore
        .then(({ rows }) => rows._array.map(row => planFromRow(row, [])));

    return await Promise.all(plans.map(plan => {
        return getPlanSchedule(plan.id).then((schedule) => ({ ...plan, schedule }));
    }));
};

const getPlanSchedule = async (planId: number): Promise<SessionActivity[]> =>
    await executeSql(`SELECT *
                      FROM PlanActivities
                             LEFT JOIN Activities ON PlanActivities.activityId = Activities.id
                      WHERE PlanActivities.planId = ?`,
        [planId])
    // @ts-ignore
        .then(({ rows }) => rows._array.map(activityFromRow));

export const getPlanById = async (id: number): Promise<SessionPlan | undefined> => {
    const plan = await executeSql('SELECT * FROM Plans WHERE id = ?', [id])
    // @ts-ignore
        .then(({ rows }) => rows._array[0]);
    const schedule = await getPlanSchedule(id);

    return planFromRow(plan, schedule);
};

export const updatePlan = async (plan: SessionPlan) => {
    await Promise.all([
        executeSql('UPDATE Plans SET name = ? WHERE id = ?', [plan.name, plan.id]),
        ...deleteSchedulePromises(plan.id)
    ]).then(() => insertSchedule(plan.id, plan.schedule));
};

const deleteSchedulePromises = (planId: number): Promise<SQLResultSet>[] => {
    return [
        executeSql('DELETE FROM Activities WHERE id IN (SELECT activityId FROM PlanActivities WHERE PlanActivities.planId = ?)', [planId]),
        executeSql('DELETE FROM PlanActivities WHERE planId  = ?', [planId]),
    ]
};
