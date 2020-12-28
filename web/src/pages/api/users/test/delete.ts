import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../../../db/Postgres";
import { restrictMethods } from "../../../../ts/api";
import { TEST_USER } from "../../../../ts/utils/test";

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
    await Database.deleteUserByEmail(TEST_USER.email);

    return res.status(200).json({});
};
