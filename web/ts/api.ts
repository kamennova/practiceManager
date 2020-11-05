import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export const restrictMethods = (allowed: string[], req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Allow', allowed);
    res.status(405).end(`Method ${req.method} Not Allowed`);
};

export const unauthorizedResponse = (res: NextApiResponse) => {
    return res.status(403).json({ error: 'Access denied: unauthorized user' });
};

export const invalidAuthTokenResponse = (res: NextApiResponse) => {
    return res.status(403).json({ error: 'Invalid authorization token' });
};

export const getUserIdByToken = (token: string): number | undefined => {
    const decoded = jwt.decode(token);

    if (decoded == null || typeof decoded == 'string' || typeof decoded.id == 'undefined') {
        return undefined;
    }

    return decoded.id;
};

export const generateToken = (userId: number): string => {
    const signature = 'MySuP3R_z3kr3t';
    const expiration = '6h';

    return jwt.sign({ id: userId }, signature, { expiresIn: expiration });
};

export const handleToken = (req: NextApiRequest, res: NextApiResponse): number | undefined | void => {
    const token = getTokenFromReq(req);

    if (token === '' || token === undefined) {
        return unauthorizedResponse(res);
    }

    const userId = getUserIdByToken(token);

    if (userId === undefined) {
        return invalidAuthTokenResponse(res);
    }

    return userId;
};

export const getTokenFromReq = (req: NextApiRequest): string | undefined => {
    if (req.method === 'POST' || req.method === 'PUT') {
        return JSON.parse(req.body).jwt;
    } else {
        return req.headers.authorization;
    }
};
