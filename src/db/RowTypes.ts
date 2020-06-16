type ItemRow = {
    id: number,
    name: string,
    addedOn: number,
    isFavourite: number,
};

export type PieceRow = ItemRow & {
    lastPracticedOn: number | null,
    imageUri: string | null,
    timeSpent: number,
    author: string | null,
    notifsOn: number,
    notifsInterval: number,
    notifId: number | null,
};

export type NoteRow = {
    id: number,
    content: string,
    pieceId: number,
    addedOn: number,
}

export type PlanRow = ItemRow;

export type ActivityRow = {
    id: number,
    type: string,
    duration: number,
    activityOrder: number,
    exercise: string | null,
    tonality: string | null,
    pieceId: number | null,
}

export type SessionRow = {
    id: number,
    planId: number | null,
    startedOn: number,
};
