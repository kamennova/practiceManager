import { PieceActivityDetailsEntity } from "../activity/PieceActivity";
import { TechniqueActivityDetailsEntity } from "../activity/TechniqueActivity";

export interface IPlanActivity {
    id: number,
    type: string,
    duration: number,
    order: number,
    details: PieceActivityDetailsEntity | TechniqueActivityDetailsEntity | null;
}
