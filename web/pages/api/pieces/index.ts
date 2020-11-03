import { EmptyPiece } from "common/types/piece";
import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../../db/Postgres";
import { getUserIdByToken, invalidAuthTokenResponse, restrictMethods, unauthorizedResponse } from "../../../ts/api";
import { Optional } from "../../../ts/helpers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'PUT':
            return await addPiece(req, res);
        case 'GET':
            return await getPieces(req, res);
        default:
            restrictMethods(['PUT', 'GET'], req, res);
            return;
    }
}

const getPieces = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization;

    if (token === undefined) {
        return unauthorizedResponse(res);
    }

    const userId = getUserIdByToken(token.toString());
    if (userId === undefined) {
        return invalidAuthTokenResponse(res);
    }

    const pieces = await Database.connect().then(db => db.getPiecesMeta(userId));

    return res.status(200).json({pieces: pieces});
};

type AddPieceData = {
    jwt: string,
    name: string,
    isFavourite: boolean,
};

const addPiece = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = JSON.parse(req.body);

    if (data.jwt == '' || data.jwt === undefined) {
        return unauthorizedResponse(res);
    }

    if (!validatePieceData(data)) {
        return res.status(406).json({ error: 'Incorrect piece data!' });
    }

    const userId = getUserIdByToken(data.jwt);
    if (userId === undefined) {
        return invalidAuthTokenResponse(res);
    }

    const db = await Database.connect();
    const piece = await db.findUserPieceByName(data.name, userId);

    if (piece !== undefined) {
        return res.status(403).json({ error: 'Piece name must be unique!' });
    }

    const pieceId = await db.addPiece(
        { ...EmptyPiece, name: data.name, isFavourite: data.isFavourite }, userId);

    return res.status(200).json({ pieceId });
};

const validatePieceData = (data: Optional<AddPieceData>): data is AddPieceData => {
    return data.name !== '' && data.name !== undefined;
};