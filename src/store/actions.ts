import { Piece, PieceBase } from "../types/Piece";
import { SessionPlan } from "../types/SessionPlan";

export const ADD_PIECE = 'Add_piece',
    SET_PIECE = 'Set_piece',
    SET_PIECES_META = 'Set_pieces_meta',
    TOGGLE_PIECE_NOTIFS = 'Toggle_piece_notifs',
    TOGGLE_PIECE_FAV = 'Toggle_piece_fav',
    UPDATE_LAST_ADDED_PIECE = 'Update_last_added_piece',
    EDIT_PIECE = 'Edit_piece',
    DELETE_PIECE = 'Delete_piece',
    SET_PIECES = 'Get_pieces',
    ADD_PLAN = 'Add_plan',
    EDIT_PLAN_SCHEDULE = 'Edit_plan_schedule',
    RENAME_PLAN = 'Rename_plan',
    DELETE_PLAN = 'Delete_plan';

export type SetPiecesAction = {
    type: typeof SET_PIECES,
    pieces: Piece[],
}

export type SetPieceAction = {
    type: typeof SET_PIECE,
    piece: Piece,
}

export type SetPiecesMetaAction = {
    type: typeof SET_PIECES_META,
    pieces: PieceBase[]
};

export type AddPieceAction = {
    type: typeof ADD_PIECE,
    piece: Piece,
};

export type UpdateLastAddedAction = {
    type: typeof UPDATE_LAST_ADDED_PIECE,
    id: number,
}

export type TogglePieceFavAction = {
    id: number,
    type: typeof TOGGLE_PIECE_FAV,
} ;

export type TogglePieceNotifsAction = {
    type: typeof TOGGLE_PIECE_NOTIFS,
    id: number,
};

export type EditPieceAction = {
    type: typeof EDIT_PIECE,
    piece: Piece,
};

export type DeletePieceAction = {
    type: typeof DELETE_PIECE,
    id: number,
};

export type AddPlanAction = {
    type: typeof ADD_PLAN,
    plan: SessionPlan,
};

export type RenamePlanAction = {
    type: typeof RENAME_PLAN,
    id: number,
    name: string,
};

export type EditPlanScheduleAction = {
    type: typeof EDIT_PLAN_SCHEDULE,
    plan: SessionPlan,
}

export type DeletePlanAction = {
    type: typeof DELETE_PLAN,
    id: number,
}

export const addPiece = (piece: Piece): AddPieceAction => ({ type: ADD_PIECE, piece }),
    setPiece = (piece: Piece): SetPieceAction => ({ type: SET_PIECE, piece }),
    updateLastAddedPiece = (id: number): UpdateLastAddedAction => ({ type: UPDATE_LAST_ADDED_PIECE, id }),
    editPiece = (piece: Piece): EditPieceAction => ({ type: EDIT_PIECE, piece }),
    togglePieceFav = (id: number): TogglePieceFavAction => ({ type: TOGGLE_PIECE_FAV, id }),
    togglePieceNotifs = (id: number): TogglePieceNotifsAction => ({ type: TOGGLE_PIECE_NOTIFS, id }),
    deletePiece = (id: number): DeletePieceAction => ({ type: DELETE_PIECE, id }),
    setPieces = (pieces: Piece[]): SetPiecesAction => ({ type: SET_PIECES, pieces }),
    setPiecesMeta = (pieces: PieceBase[]): SetPiecesMetaAction => ({ type: SET_PIECES_META, pieces }),
    addPlan = (plan: SessionPlan): AddPlanAction => ({ type: ADD_PLAN, plan }),
    editPlanSchedule = (plan: SessionPlan): EditPlanScheduleAction => ({ type: EDIT_PLAN_SCHEDULE, plan }),
    renamePlan = (id: number, name: string): RenamePlanAction => ({ type: RENAME_PLAN, id, name }),
    deletePlan = (id: number): DeletePlanAction => ({ type: DELETE_PLAN, id });

export type PieceActionTypes = AddPieceAction
    | SetPiecesMetaAction
    | SetPieceAction
    | EditPieceAction
    | TogglePieceNotifsAction
    | TogglePieceFavAction
    | DeletePieceAction
    | SetPiecesAction
    | UpdateLastAddedAction;
export type PlanActionTypes = AddPlanAction | EditPlanScheduleAction | RenamePlanAction | DeletePlanAction;

export type AppActionTypes = PieceActionTypes | PlanActionTypes;
