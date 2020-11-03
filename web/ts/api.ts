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
