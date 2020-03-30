import { Piece, PieceStatus } from "./Piece";

export const EmptyPiece: Piece = {
    id: 0,
    name: '',
    isFavourite: false,
    timeSpent: 0,
    notifsOn: false,
    notifsInterval: 3,
    authors: [],
    tags: [],
    notes: [],
    addedOn: new Date(),
    status: PieceStatus.NotStarted,
    recordings: [],
};
