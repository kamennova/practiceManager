import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../../db/Postgres";
import { restrictMethods } from "../../../ts/api";

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
    const pieceId = req.query.id;
    const data = JSON.parse(req.body);
    const userId = data.jwt;

    if (userId === undefined) {
        return res.status(403).json({ error: 'User unauthorized' });
    }

    const db = await Database.connect();
    const piece = db.findUserPieceById(Number(pieceId), userId);

    if (piece === undefined) {
        return res.status(404).json({ error: 'Piece not found' });
    }

    return res.status(200).json({ piece });
};
