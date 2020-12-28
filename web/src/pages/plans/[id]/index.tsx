import { deletePlan } from 'common/store/actions';
import { useRouter } from "next/router";
import React, { useState } from 'react';
import { connect } from "react-redux";
import { ItemMenu } from "../../../components/Item";
import { ItemButtons } from "../../../components/Item/Buttons";
import { DeleteModal } from "../../../components/Item/DeleteModal";
import { PlanFeatures } from "../../../components/PlanFeatures";
import { getJwt, usePlan } from "../../../ts/hooks";

function planComponent(props: { deletePlan: (id: number) => void }) {
    const plan = usePlan();
    const router = useRouter();
    const [showDeleteModal, setShowDelete] = useState(false);

    const onDelete = () => setShowDelete(true);
    const onEdit = () => router.push('/plans/' + plan.id + '/edit');
    const goToNext = () => router.push('/plans/2');
    const goToPrev = () => router.push('/plans/1');

    const deletePlanItem = async () => {
        const id = plan.id;
        const jwt = getJwt();

            await deleteQuery(plan.id, jwt).then((res) => {
                if (!res.error) {
                    props.deletePlan(id);
                    router.push('/plans')
                }
            });
    };

    return (
        <div className={'item-page'}>
            <header className={'page-header item-page-header'}>
                <h2 className={'page-title item-name'}>{plan.name}</h2>
                <ItemMenu onDelete={onDelete} onEdit={onEdit}/>
            </header>
            <PlanFeatures plan={plan}/>
            <ItemButtons
                relatedItems={[{ item: 'Plan #2', onClick: goToPrev }, { item: 'Plan #3', onClick: goToNext }]}/>
            {showDeleteModal ?
                <DeleteModal onClose={() => setShowDelete(false)} onConfirm={deletePlanItem}/> : undefined}
        </div>
    );
}

const deleteQuery = async (id: number, jwt: string) => await fetch('/api/plans/' + id, {
    method: 'DELETE',
    headers: {
        "Content-Type": "application/json",
        'Authorization': jwt
    }
}).then(resp => resp.json());

const mapDispatchToProps = (dispatch: any) => ({
    deletePlan: (id: number) => dispatch(deletePlan(id)),
});

export default connect(undefined, mapDispatchToProps)(planComponent);
