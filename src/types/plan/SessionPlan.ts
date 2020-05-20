import { Item } from "../item/Item";
import { PlanActivity } from "./PlanActivity";

export type SessionPlan = Item & {
    name: string;
    schedule: PlanActivity[]; // order is important
    createdOn: number,
}
