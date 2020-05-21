import { PlanEntity } from "../plan";

export interface ISession {
    id: number,
    startedOn: number,
    plan?: PlanEntity,
}
