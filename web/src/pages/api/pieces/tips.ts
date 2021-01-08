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
            return await getPiecesTips(req, res);
        default:
            restrictMethods(['GET', 'POST', 'DELETE'], req, res);
            return;
    }
}

const getPiecesTips = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = getTokenFromReq(req);

    if (token === undefined || token === '') {
        return unauthorizedResponse(res);
    }

    const userId = getUserIdByToken(token);
    if (userId === undefined) {
        return invalidAuthTokenResponse(res);
    }

    const tips = Database.findUserPiecesLike(req.query.input as string, userId);

    return res.status(200).json({ results: tips });
};
