import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../../db/Postgres";
import {
    getTokenFromReq,
    getUserIdByToken,
    invalidAuthTokenResponse,
    restrictMethods,
    unauthorizedResponse
} from "../../../ts/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return await getUser(req, res);
        default:
            restrictMethods(['GET'], req, res);
            return;
    }
}

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = getTokenFromReq(req);

    if (token === undefined) {
        return unauthorizedResponse(res);
    }

    const userId = getUserIdByToken(token.toString());
    if (userId === undefined) {
        return invalidAuthTokenResponse(res);
    }

    if (userId !== Number(req.query.id)) {
        return res.status(403).json({ error: 'Access denied' });
    }

    const db = await Database.connect();
    const user = await db.getUserById(userId);

    if (user === undefined) {
        return res.status(404).json({ error: 'User not found!' });
    } else {
        return res.status(200).json({ user });
    }
};
