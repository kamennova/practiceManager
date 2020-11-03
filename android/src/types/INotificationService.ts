import { Piece } from "./piece";

export interface INotificationService {
    schedulePieceNotif(piece: Piece): Promise<void>;
    cancelNotifIfSet(notifId: number): Promise<void>;
}
