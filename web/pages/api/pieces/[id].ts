import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../../db/Postgres";
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
        default:
            restrictMethods(['GET'], req, res);
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

    const db = await Database.connect();
    const piece = await db.findUserPieceById(pieceId, userId);

    if (piece === undefined) {
        return res.status(404).json({ error: 'Piece not found' });
    }

    return res.status(200).json({ piece });
};
