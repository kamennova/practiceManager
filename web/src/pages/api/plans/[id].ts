import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../../db/Database";
import {
    getTokenFromReq,
    getUserIdByToken,
    invalidAuthTokenResponse,
    restrictMethods,
    unauthorizedResponse
} from "../../../ts/api";

export default async function planHandler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return await getPlan(req, res);
        case 'POST':
            return await updatePlan(req, res);
        case 'DELETE':
            return await deletePlan(req, res);
        default:
            restrictMethods(['GET', 'POST', 'DELETE'], req, res);
            return;
    }
}

const getPlan = async (req: NextApiRequest, res: NextApiResponse) => {
    const planId = Number(req.query.id);
    const token = getTokenFromReq(req);

    if (token === undefined || token === '') {
        return unauthorizedResponse(res);
    }

    const userId = getUserIdByToken(token);
    if (userId === undefined) {
        return invalidAuthTokenResponse(res);
    }

    const plan = await Database.findUserPlanById(planId, userId);

    if (plan === undefined) {
        return res.status(404).json({ error: 'plan not found' });
    }

    return await res.status(200).json({ plan });
};

const updatePlan = async (req: NextApiRequest, res: NextApiResponse) => {
    const planId = Number(req.query.id);
    const token = getTokenFromReq(req);

    if (token === undefined || token === '') {
        return unauthorizedResponse(res);
    }

    const userId = getUserIdByToken(token);
    if (userId === undefined) {
        return invalidAuthTokenResponse(res);
    }

    const plan = await Database.findUserPlanById(planId, userId);

    if (plan === undefined) {
        return res.status(404).json({ error: 'plan not found' });
    }

    const planUpd = req.body.plan;
    await Database.updatePlan(planUpd);

    return await res.status(200).json({ planUpd })
};

const deletePlan = async (req: NextApiRequest, res: NextApiResponse) => {
    const planId = Number(req.query.id);
    const token = getTokenFromReq(req);

    if (token === undefined || token === '') {
        return unauthorizedResponse(res);
    }

    const userId = getUserIdByToken(token);
    if (userId === undefined) {
        return invalidAuthTokenResponse(res);
    }

    const plan = await Database.findUserPlanById(planId, userId);

    if (plan === undefined) {
        return res.status(404).json({ error: 'plan not found' });
    }

    await Database.deletePlan(planId);

    return res.status(200).json({});
};
