import { Piece } from "./Piece";

export const EmptyPiece: Piece = {
    id: 0,
    name: '',
    isFavourite: false,
    timeSpent: 0,
    notifications: {
        interval: 3,
        enabled: true,
    },
    authors: [],
    tags: [],
    notes: [],
    addedOn: new Date(),
};
