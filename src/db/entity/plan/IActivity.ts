import { PieceActivityDetailsEntity, TechniqueActivityDetailsEntity } from "../plan";

export interface IActivity {
    id: number,
    type: string,
    duration: number,
    order: number,
    details: PieceActivityDetailsEntity | TechniqueActivityDetailsEntity | null;
}
