import { editPlan } from 'common/store/actions/plan';
import { SessionPlan } from "common/types/plan";
import { useRouter } from "next/router";
import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { FormMode, PlanForm } from "../../../components/PlanForm";
import { getJwt, usePlan } from "../../../ts/hooks";

function EditPlan(props: { updatePlan: (p: SessionPlan) => void }) {
    const plan = usePlan();
    const router = useRouter();

    const onSave = async (upd: SessionPlan) => {
        const jwt = getJwt();
        await updateQuery(upd, jwt).then(res => {
            if (res.error === undefined) {
                props.updatePlan(upd);
                router.push('/plans/' + plan.id)
            }
        });
    };

    useEffect(() => {
        console.log(plan.name + ' loaded');
    }, [plan]);

    return (
        <div>
            {plan.name}
            <PlanForm key={plan.name} mode={FormMode.Edit} plan={plan} onSubmit={onSave}/>
        </div>
    );
}

const updateQuery = async (plan: SessionPlan, jwt: string) => await fetch('/api/plans/' + plan.id, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        'Authorization': jwt
    },
    body: JSON.stringify({ plan, jwt }),
}).then(resp => resp.json());

const mapDispatchToProps = (dispatch: any) => ({
    updateplan: (p: SessionPlan) => dispatch(editPlan(p)),
});

export default connect(undefined, mapDispatchToProps)(EditPlan);
