import { Item } from "./item/Item";
import { PlanActivity } from "./PlanActivity";

export type SessionSchedule = PlanActivity[];

export type SessionPlan = Item & {
    name: string;
    schedule: SessionSchedule; // order is important
    createdOn: number,
}
