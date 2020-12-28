import {  SessionPlan } from "common/types/plan";
import { EmptyPlan } from "common/types/plan/EmptyPlan";
import { useRouter } from "next/router";
import React from 'react';
import { FormMode, PlanForm } from "../../components/PlanForm";
import { getJwt } from "../../ts/hooks";

export default function AddPlanPage() {
    const router = useRouter();

    const savePlan = async (plan: SessionPlan) => {
        const jwt = getJwt();

        const res = await addPlan(plan, jwt);
        if (res.error !== undefined) {
            console.log(res.error);
        } else {
            router.push('/plans/' + res.planId);
        }
    };

    return (
        <PlanForm mode={FormMode.Create} plan={EmptyPlan} onSubmit={savePlan}/>
    );
}

const addPlan = async (plan: { name: string, isFavourite: boolean }, jwt: string) => await fetch('/api/plans', {
    method: 'PUT',
    body: JSON.stringify({ ...plan, jwt })
})
    .then(resp => resp.json());

