import { Piece } from "./types/Piece";
import { SessionPlan } from "./types/SessionPlan";

export const ADD_PIECE = 'Add_piece',
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

export type AddPieceAction = {
    type: typeof ADD_PIECE,
    piece: Piece,
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
    editPiece = (piece: Piece): EditPieceAction => ({ type: EDIT_PIECE, piece }),
    deletePiece = (id: number): DeletePieceAction => ({ type: DELETE_PIECE, id }),
    setPieces = (pieces: Piece[]): SetPiecesAction => ({ type: SET_PIECES, pieces }),
    addPlan = (plan: SessionPlan): AddPlanAction => ({ type: ADD_PLAN, plan }),
    editPlanSchedule = (plan: SessionPlan): EditPlanScheduleAction => ({ type: EDIT_PLAN_SCHEDULE, plan }),
    renamePlan = (id: number, name: string): RenamePlanAction => ({ type: RENAME_PLAN, id, name }),
    deletePlan = (id: number): DeletePlanAction => ({ type: DELETE_PLAN, id });

export type PieceActionTypes = AddPieceAction | EditPieceAction | DeletePieceAction | SetPiecesAction;
export type PlanActionTypes = AddPlanAction | EditPlanScheduleAction | RenamePlanAction | DeletePlanAction;

export type AppActionTypes = PieceActionTypes | PlanActionTypes;
