import { getRepository } from "typeorm";
import { Piece } from "../types/Piece";
import { SessionPlan } from "../types/SessionPlan";
import { PieceEntity } from "./entity/piece";
import { PlanEntity } from "./entity/plan";

export type CheckResult = { valid: true } | {
    valid: false,
    errors: string,
};

export const validatePlan = async (plan: SessionPlan): Promise<CheckResult> => {
    if (plan.name.length === 0) {
        return Promise.resolve({ valid: false, errors: 'You forgot to enter plan title ✍' });
    } else if (plan.schedule.length === 0) {
        return Promise.resolve({ valid: false, errors: 'You forgot to add activities to schedule' });
    } else if (!(await isPlanNameUnique(plan))) {
        return Promise.resolve({ valid: false, errors: 'Plan with the same name already exists :/' });
    }

    return Promise.resolve({ valid: true });
};

const isPlanNameUnique = async (plan: SessionPlan): Promise<boolean> => {
    const repo = getRepository(PlanEntity);

    return (await repo.find({ where: { name: plan.name } })).filter(p => p.id !== plan.id).length === 0;
};

export const validatePiece = async (piece: Piece): Promise<CheckResult> => {
    if (piece.name.length === 0) {
        return Promise.resolve({ valid: false, errors: 'You forgot to enter piece title ✍' });
    }

    const repo = getRepository(PieceEntity);
    const piecesWithSameName = (await repo.find({ where: { name: piece.name }, relations: ['authors'] }))
        .filter(item => item.id !== piece.id);

    if (piecesWithSameName.length > 0) {
        if (piece.authors.length === 0 || piecesWithSameName.find(item => areAuthorsSame(item, piece) !== undefined)) {
            return Promise.resolve({
                valid: false,
                errors: 'A piece with the same name and author(s) already exists 🤷‍'
            });
        }
    }

    return Promise.resolve({ valid: true });
};

const areAuthorsSame = (pieceInDb: PieceEntity, piece: Piece) => {
    if (pieceInDb.authors.length !== piece.authors.length) {
        return false;
    }

    if (pieceInDb.authors.length === 0) {
        return true;
    }

    for (let i = 0; i < pieceInDb.authors.length; i++) {
        if (piece.authors.indexOf(pieceInDb.authors[i].name) === undefined)
            return false;
    }

    return true;
};
