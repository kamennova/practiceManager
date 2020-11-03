import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../../../db/Postgres";
import jwt from 'jsonwebtoken';
import { restrictMethods } from "../../../../ts/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            return await signIn(req, res);
        default:
            restrictMethods(['POST'], req, res);
    }
}

const signIn = async (req: NextApiRequest, res: NextApiResponse) => {
    const db = await Database.connect();
    const userReq = JSON.parse(req.body);

    const user = await db.getUserByEmail(userReq.email);

    if (user === undefined) {
        return res.status(404).json({ error: 'User with such email does not exist!' });
    }

    if (user.password_hash !== userReq.password) {
        return res.status(403).json({ error: 'Wrong password!' });
    }

    return res.status(200).json({ user, jwtToken: generateToken(user.id) });
};

const generateToken = (userId: number): string => {
    const signature = 'MySuP3R_z3kr3t';
    const expiration = '6h';

    return jwt.sign({ id: userId }, signature, { expiresIn: expiration });
};
