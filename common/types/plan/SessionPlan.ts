import { Item } from "../item/Item";
import { SessionActivity } from "../activity";

export type SessionPlan = Item & {
    schedule: SessionActivity[];
}
