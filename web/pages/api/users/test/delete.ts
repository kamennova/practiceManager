import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../../../db/Postgres";
import { restrictMethods } from "../../../../ts/api";
import { TEST_USER } from "../../../../ts/TestData";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return await deleteTestUser(res);
        default:
            restrictMethods(['GET'], req, res);
            return;
    }
}

const deleteTestUser = async (res: NextApiResponse) => {
    const db = await Database.connect();
    await db.deleteUserByEmail(TEST_USER.email);
    await db.client.end();

    return res.status(200).json({});
};
