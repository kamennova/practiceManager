import { Piece, PieceBase } from "common/types/piece";
import { SessionPlan } from "common/types/plan";
import { Item } from "common/types/item/Item";
import { User } from "../ts/user";

export interface IDatabase<IdType> extends IUserDatabase<IdType>, IPieceDatabase<IdType>, IPlanDatabase<IdType> {
}

export interface IUserDatabase<IdType> {
    deleteUserById(id: IdType): Promise<void>;

    deleteUserByEmail(email: string): Promise<void>;

    createUser(email: string, password: string): Promise<IdType>;

    getUserByEmail(email: string): Promise<User | undefined>;

    getUserById(id: IdType): Promise<User | undefined>;
}

export interface IPieceDatabase<IdType> {
    addPiece(p: Piece, userId: IdType): Promise<IdType>;

    deletePiece(id: IdType): Promise<void>;

    findUserPieceById(id: IdType, userId: IdType): Promise<Piece | undefined>;

    findUserPieceByName(name: string, userId: IdType): Promise<Piece | undefined>;

    getPiecesMeta(userId: IdType): Promise<PieceBase[]>;

    toggleIsFavourite(id: IdType): Promise<void>;

    updatePiece(piece: Piece): Promise<void>;
}

export interface IPlanDatabase<IdType> {
    addPlan(p: SessionPlan, userId: IdType): Promise<IdType>;

    deletePlan(id: IdType): Promise<void>;

    findUserPlanById(id: IdType, userId: IdType): Promise<SessionPlan | undefined>;

    updatePlan(plan: SessionPlan): Promise<void>;

    findUserPlanByName(name: string, userId: IdType): Promise<SessionPlan | undefined>;

    getPlansMeta(userId: IdType): Promise<Item[]>;

    toggleIsFavourite(id: IdType): Promise<void>;
}
