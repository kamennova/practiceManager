import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../../db/Database";
import {
    getTokenFromReq,
    getUserIdByToken,
    invalidAuthTokenResponse,
    restrictMethods,
    unauthorizedResponse
} from "../../../ts/api";

export default async function pieceHandler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return await getPiece(req, res);
        case 'POST':
            return await updatePiece(req, res);
        case 'DELETE':
            return await deletePiece(req, res);
        default:
            restrictMethods(['GET', 'POST', 'DELETE'], req, res);
            return;
    }
}

const getPiece = async (req: NextApiRequest, res: NextApiResponse) => {
    const pieceId = Number(req.query.id);
    const token = getTokenFromReq(req);

    if (token === undefined || token === '') {
        return unauthorizedResponse(res);
    }

    const userId = getUserIdByToken(token);
    if (userId === undefined) {
        return invalidAuthTokenResponse(res);
    }

    const piece = await Database.findUserPieceById(pieceId, userId);

    if (piece === undefined) {
        return res.status(404).json({ error: 'Piece not found' });
    }

    return await res.status(200).json({ piece });
};

const updatePiece = async (req: NextApiRequest, res: NextApiResponse) => {
    const pieceId = Number(req.query.id);
    const token = getTokenFromReq(req);

    if (token === undefined || token === '') {
        return unauthorizedResponse(res);
    }

    const userId = getUserIdByToken(token);
    if (userId === undefined) {
        return invalidAuthTokenResponse(res);
    }

    const piece = await Database.findUserPieceById(pieceId, userId);

    if (piece === undefined) {
        return res.status(404).json({ error: 'Piece not found' });
    }

    const pieceUpd = req.body.piece;
    await Database.updatePiece(pieceUpd);

    return await res.status(200).json({ pieceUpd })
};

const deletePiece = async (req: NextApiRequest, res: NextApiResponse) => {
    const pieceId = Number(req.query.id);
    const token = getTokenFromReq(req);

    if (token === undefined || token === '') {
        return unauthorizedResponse(res);
    }

    const userId = getUserIdByToken(token);
    if (userId === undefined) {
        return invalidAuthTokenResponse(res);
    }

    const piece = await Database.findUserPieceById(pieceId, userId);

    if (piece === undefined) {
        return res.status(404).json({ error: 'Piece not found' });
    }

    await Database.deletePiece(pieceId);

    return res.status(200).json({});
};
