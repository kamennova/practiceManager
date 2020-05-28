import { PieceActivityDetailsEntity } from "./PieceActivity";
import { TechniqueActivityDetailsEntity } from "./TechniqueActivity";

export interface IActivity {
    id: number,
    type: string,
    duration: number,
    order: number,
    details: PieceActivityDetailsEntity | TechniqueActivityDetailsEntity | null;
}
