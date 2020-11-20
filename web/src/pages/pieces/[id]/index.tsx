import { deletePiece } from 'common/store/actions';
import { useRouter } from "next/router";
import React, { useState } from 'react';
import { connect } from "react-redux";
import { ItemMenu } from "../../../components/Item";
import { ItemButtons } from "../../../components/Item/Buttons";
import { DeleteModal } from "../../../components/Item/DeleteModal";
import { PieceFeatures } from "../../../components/PieceFeatures";
import { getJwt, usePiece } from "../../../ts/hooks";

function PieceComponent(props: { deletePiece: (id: number) => void }) {
    const piece = usePiece();
    const router = useRouter();
    const [showDeleteModal, setShowDelete] = useState(false);

    const onDelete = () => setShowDelete(true);
    const onEdit = () => router.push('/pieces/' + piece.id + '/edit');
    const goToNext = () => router.push('/pieces/2');
    const goToPrev = () => router.push('/pieces/1');

    const deletePieceItem = async () => {
        const id = piece.id;
        const jwt = getJwt();

            await deleteQuery(piece.id, jwt).then((res) => {
                if (!res.error) {
                    props.deletePiece(id);
                    router.push('/pieces')
                }
            });
    };

    return (
        <div className={'item-page'}>
            <header className={'page-header item-page-header'}>
                <h2 className={'page-title item-name'}>{piece.name}</h2>
                {piece.author !== undefined ? <h3>{piece.author}</h3> : undefined}
                <ItemMenu onDelete={onDelete} onEdit={onEdit}/>
            </header>
            <PieceFeatures piece={piece}/>
            <ItemButtons
                relatedItems={[{ item: 'Georgiana', onClick: goToPrev }, { item: 'Dawn', onClick: goToNext }]}/>
            {showDeleteModal ?
                <DeleteModal onClose={() => setShowDelete(false)} onConfirm={deletePieceItem}/> : undefined}
        </div>
    );
}

const deleteQuery = async (id: number, jwt: string) => await fetch('/api/pieces/' + id, {
    method: 'DELETE',
    headers: {
        "Content-Type": "application/json",
        'Authorization': jwt
    }
}).then(resp => resp.json());

const mapDispatchToProps = (dispatch: any) => ({
    deletePiece: (id: number) => dispatch(deletePiece(id)),
});

export default connect(undefined, mapDispatchToProps)(PieceComponent);
