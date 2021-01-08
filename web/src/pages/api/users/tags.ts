import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../../db/Database";
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
            return await getUserTags(req, res);
        case 'POST':
            return await createUserTag(req, res);
        default:
            restrictMethods(['GET'], req, res);
            return;
    }
}

const getUserTags = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = getTokenFromReq(req);

    if (token === undefined) {
        return unauthorizedResponse(res);
    }

    const userId = getUserIdByToken(token.toString());
    if (userId === undefined) {
        return invalidAuthTokenResponse(res);
    }

    const tags = await Database.getUserTags(userId);

    return res.status(200).json({ results: tags });
};

const createUserTag = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = getTokenFromReq(req);

    if (token === undefined) {
        return unauthorizedResponse(res);
    }

    const userId = getUserIdByToken(token.toString());
    if (userId === undefined) {
        return invalidAuthTokenResponse(res);
    }

    const data = JSON.parse(req.body);
    const tagId = await Database.createUserTag(data.name, data.color, userId);

    return res.status(200).json({ id: tagId });
};
