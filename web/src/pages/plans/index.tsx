import { setPlans } from 'common/store/actions';
import { StateShape } from "common/store/StoreState";
import { SessionPlan } from 'common/types/plan';
import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Button, PrimaryButton } from "../../components/Button";
import { getJwt } from "../../ts/hooks";

function Plans(props: { plans: SessionPlan[], setPlans: (p: SessionPlan[]) => void }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!isLoaded) {
            const jwt = getJwt();

            getPieces(jwt).then(res => {
                props.setPlans(res.pieces);
                setIsLoaded(true);
            });
        }
    }, [isLoaded]);

    const addPiece = () => router.push('/pieces/add');

    return (
        <div className={'plans-page main-content items-page'}>
            <header className={'page-header'}>
                <h2 className={'page-title'}>Plans</h2>
                <PrimaryButton className={'add-btn'} onClick={addPiece}>Add plan</PrimaryButton>
            </header>

            <ul className={'plans-list'}>
                {props.plans.map(plan => <PlanItem {...plan}/>)}
            </ul>
        </div>
    );
}

const PlanItem = (props: SessionPlan) => (
    <li className='plan-item' key={props.id}>
        <h2 className={'item-name plan-name'}><Link href={'/plans/' + props.id}>{props.name}</Link></h2>
    </li>
);

const getPieces = async (token: string) => await fetch('/api/pieces', {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        'Authorization': token
    }
}).then(resp => resp.json());

const mapDispatchToProps = (dispatch: any) => ({
    setPlans: (items: SessionPlan[]) => dispatch(setPlans(items)),
});

const mapStateToProps = (state: StateShape) => ({
    plans: state.plans.items,
});

export default connect(mapStateToProps, mapDispatchToProps)(Plans);
