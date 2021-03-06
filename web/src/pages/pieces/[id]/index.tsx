import { deletePiece } from 'common/store/actions';
import { useRouter } from "next/router";
import React, { useState } from 'react';
import { connect } from "react-redux";
import { ItemMenu } from "../../../components/Item";
import { ItemButtons } from "../../../components/Item/Buttons";
import { DeleteModal } from "../../../components/Item/DeleteModal";
import { ItemSection } from "../../../components/Item/ItemSection";
import { PieceFeatures } from "../../../components/piece/PieceFeatures";
import { PieceStats } from "../../../components/piece/PieceStats";
import { TagList } from "../../../components/piece/TagList";
import { getJwt, usePiece } from "../../../ts/hooks";
import { deletePieceQuery } from "../../../utils/requests";

const PieceComponent = (props: { deletePiece: (id: number) => void }) => {
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

        await deletePieceQuery(piece.id, jwt).then((res) => {
            if (!res.error) {
                props.deletePiece(id);
                router.push('/pieces');
            }
        });
    };

    return (
        <div className={'item-page'}>
            {showDeleteModal ?
                <DeleteModal onClose={() => setShowDelete(false)} onConfirm={deletePieceItem}/> : undefined}

            <div className={'main-content'}>
                <header className={'page-header item-page-header'}>
                    <h2 className={'page-title item-name'}>{piece.name}</h2>
                    <TagList tags={piece.tags}/>
                    <ItemMenu onDelete={onDelete} onEdit={onEdit} isFav={piece.isFavourite}
                              toggleFav={() => console.log('d')}/>
                </header>

                {piece.imageUri &&
                <div className={'item-pic'}>
                    <img src={piece.imageUri} alt="me" width={'100%'} height={'100%'}/>
                    <div className={'overlay'}/>
                </div>}

                <PieceFeatures {...piece}/>
                <div style={{ marginTop: 20 }}>
                    <PieceStats {...piece}/>
                </div>
            </div>

            <ItemSection title={'Notes'}>
                <div>
                    {piece.notes.length === 0 && <p className={'no-items'}>No notes yet!</p>}
                    {piece.notes.map(() => <li>dgfdfg</li>)}
                </div>
            </ItemSection>

            <ItemSection title={'Recordings'}>
                <div>
                    {piece.notes.length === 0 && <p className={'no-items'}>No recordings yet!</p>}
                    {piece.notes.map(() => <li>dgfdfg</li>)}
                </div>
            </ItemSection>

            <div className={'main-content'} style={{ marginTop: 'auto' }}>
                <ItemButtons
                    relatedItems={[{ item: 'Georgiana', onClick: goToPrev }, { item: 'Dawn', onClick: goToNext }]}/>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch: any) => ({
    deletePiece: (id: number) => dispatch(deletePiece(id)),
});

export default connect(undefined, mapDispatchToProps)(PieceComponent);
