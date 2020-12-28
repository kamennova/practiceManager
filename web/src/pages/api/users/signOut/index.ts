import { NextApiRequest, NextApiResponse } from "next";
import { restrictMethods } from "../../../../ts/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            return await signOut(req, res);
        default:
            restrictMethods(['POST'], req, res);
    }
}

const signOut = async (_: NextApiRequest, res: NextApiResponse) => {
    return await res.end();
};
