import { SessionPlan } from 'common/types/plan';
import { useRouter } from "next/router";
import React, { useState } from 'react';
import { Button } from "./Button";
import { FormControl } from "./FormControl";
import { Checkbox } from "./inputs/Checkbox";
import { TextInput } from "./inputs/TextInput";

export enum FormMode {
    Create, Edit
}

export const PlanForm = (props: { mode: FormMode, plan: SessionPlan, onSubmit: (p: SessionPlan) => void }) => {
    const [plan, setPlan] = useState<SessionPlan>(props.plan);
    const setProperty = (prop: keyof SessionPlan) => {
        return (val: string | any) => {
            setPlan({ ...plan, [prop]: val });
        }
    };
    const router = useRouter();

    return (
        <div className={'item-form-page'}>
            {props.mode === FormMode.Create ? 'Create plan' : 'Edit plan'}
            <FormControl label={'Title'}>
                <TextInput name='title' value={plan.name} onChange={setProperty('name')}/>
            </FormControl>

            <Checkbox label={'Favourite'}
                      name='isFavourite'
                      value={plan.isFavourite}
                      onChange={setProperty('isFavourite')}/>

            <div className={'form-buttons'}>
                <Button onClick={() => router.back()}>Cancel</Button>
                <Button onClick={() => props.onSubmit(plan)}>Save</Button>
            </div>
        </div>
    );
};
