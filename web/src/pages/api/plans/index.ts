import { EmptyPlan } from "common/types/plan";
import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../../db/Database";
import {
    getTokenFromReq,
    getUserIdByToken,
    invalidAuthTokenResponse,
    restrictMethods,
    unauthorizedResponse
} from "../../../ts/api";
import { Optional } from "../../../ts/helpers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'PUT':
            return await addPlan(req, res);
        case 'GET':
            return await getPlans(req, res);
        default:
            restrictMethods(['PUT', 'GET'], req, res);
            return;
    }
}

const getPlans = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = getTokenFromReq(req);

    if (token === undefined) {
        return unauthorizedResponse(res);
    }

    const userId = getUserIdByToken(token.toString());
    if (userId === undefined) {
        return invalidAuthTokenResponse(res);
    }

    const Plans = await Database.getPlansMeta(userId);

    return res.status(200).json({ Plans });
};

type AddPlanData = {
    jwt: string,
    name: string,
    isFavourite: boolean,
    tags: string[],
    author?: string,
};

const addPlan = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = getTokenFromReq(req);

    if (token == '' || token === undefined) {
        return unauthorizedResponse(res);
    }

    const userId = getUserIdByToken(token);

    if (userId === undefined) {
        return invalidAuthTokenResponse(res);
    }

    const data = JSON.parse(req.body);

    if (!validatePlanData(data)) {
        return res.status(400).json({ error: 'Incorrect Plan data!' });
    }

    const Plan = await Database.findUserPlanByName(data.name, userId);

    if (Plan !== undefined) {
        return res.status(403).json({ error: 'Plan name must be unique!' });
    }

    const PlanId = await Database.addPlan({ ...EmptyPlan, ...data }, userId);

    return res.status(200).json({ PlanId });
};

const validatePlanData = (data: Optional<AddPlanData>): data is AddPlanData => {
    return data.name !== '' && data.name !== undefined;
};
