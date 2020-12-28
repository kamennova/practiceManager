import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../../db/Database";
import { restrictMethods } from "../../../ts/api";
import { Optional } from "../../../ts/helpers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'PUT':
            return await createUser(req, res);
        default:
            restrictMethods(['PUT'], req, res);
            return;
    }
}

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const userReq = JSON.parse(req.body);

    if (!validateUserInput(userReq)) {
        return res.status(400).json({ error: 'User input is not valid' });
    }

    if (await Database.getUserByEmail(userReq.email) !== undefined) {
        return res.status(400).json({ error: 'User with such email already exists!' });
    }

    const userId = await Database.createUser(userReq.email, userReq.password);

    return await res.status(200).json({ id: userId });
};

type UserData = {
    email: string,
    password: string,
}

const validateUserInput = (input: Optional<UserData>): input is UserData => {
    return input.email !== undefined && input.email !== "" && input.password !== undefined && input.password !== "";
};
