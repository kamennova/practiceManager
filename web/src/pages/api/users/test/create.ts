import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../../../db/Postgres";
import { restrictMethods } from "../../../../ts/api";
import { TEST_USER } from "../../../../ts/utils/test";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return await createTestUser(res);
        default:
            restrictMethods(['GET'], req, res);
            return;
    }
}

const createTestUser = async (res: NextApiResponse) => {
    const db = await Database.connect();
    const userId = await db.createUser(TEST_USER.email, TEST_USER.password);
    await db.client.end();

    return res.status(200).json({ userId });
};
