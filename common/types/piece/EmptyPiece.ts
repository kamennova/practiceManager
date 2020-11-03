import { Piece, PieceStatus } from "./Piece";

export const EmptyPiece: Piece = {
    id: 0,
    name: '',
    isFavourite: false,
    timeSpent: 0,
    notifId: null,
    notifsOn: false,
    notifsInterval: 3,
    tags: [],
    notes: [],
    addedOn: new Date(),
    status: PieceStatus.NotStarted,
    recordings: [],
};
