import { deletePiece } from 'common/store/actions';
import { PieceComplexity, PieceMood } from "common/types/piece/Piece";
import { useRouter } from "next/router";
import React, { useState } from 'react';
import { connect } from "react-redux";
import { ItemMenu } from "../../../components/Item";
import { ItemButtons } from "../../../components/Item/Buttons";
import { DeleteModal } from "../../../components/Item/DeleteModal";
import { PieceFeatures } from "../../../components/piece/PieceFeatures";
import { PieceStats } from "../../../components/piece/PieceStats";
import { TagList } from "../../../components/piece/TagList";
import { getJwt, usePiece } from "../../../ts/hooks";
import Image from 'next/image'

function PieceComponent(props: { deletePiece: (id: number) => void }) {
    const piece = usePiece();
    const router = useRouter();
    const [showDeleteModal, setShowDelete] = useState(false);

    console.log(piece);

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
            {showDeleteModal ?
                <DeleteModal onClose={() => setShowDelete(false)} onConfirm={deletePieceItem}/> : undefined}

            <div className={'main-content'}>
                <div className={'item-pic'}>
                    <Image src={'/static/images/ost/ost1.jpg'} alt="me" width={'100%'} height={'100%'}/>
                    <div className={'overlay'}/>
                </div>
                <header className={'page-header item-page-header'}>
                    <h2 className={'page-title item-name'}>{piece.name}</h2>
                    <TagList tags={piece.tags}/>
                    <ItemMenu onDelete={onDelete} onEdit={onEdit} isFav={piece.isFavourite}
                              toggleFav={() => console.log('d')}/>
                </header>
                <PieceFeatures {...piece} mood={PieceMood.Cheerful} complexity={PieceComplexity.Advanced}/>
                <PieceStats {...piece}/>
            </div>

            <div className={'item-section main-content'}>
                <h3 className={'section-title'}>Notes</h3>
                {piece.notes.length === 0 && <p className={'no-items'}>No notes yet!</p>}
                {piece.notes.map(() => <li>dgfdfg</li>)}
            </div>

            <div className={'item-section main-content'}>
                <h3 className={'section-title'}>Recordings</h3>
                {piece.notes.length === 0 && <p className={'no-items'}>No recordings yet!</p>}
                {piece.notes.map(() => <li>dgfdfg</li>)}
            </div>

            <div className={'main-content'} style={{marginTop: 'auto'}}>
                <ItemButtons
                    relatedItems={[{ item: 'Georgiana', onClick: goToPrev }, { item: 'Dawn', onClick: goToNext }]}/>
            </div>
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
