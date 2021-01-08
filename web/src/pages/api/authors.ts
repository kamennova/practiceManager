import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../db/Database";
import { restrictMethods } from "../../ts/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return await getAuthors(req, res);
        default:
            restrictMethods(['PUT', 'GET'], req, res);
            return;
    }
}

const getAuthors = async (req: NextApiRequest, res: NextApiResponse) => {
    const tips = await Database.findAuthorsLike(req.query.name);

    return res.status(200).json({ results: tips });
};
