import { setPiecesMeta } from "common/store/actions";
import { StateShape } from "common/store/StoreState";
import { PieceBase } from "common/types/piece";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { PrimaryButton } from "../../components/Button";
import { TagList } from "../../components/piece/TagList";
import { getJwt } from "../../ts/hooks";

enum SortingOrder {
    Title,
    DateAdded,
}

function Pieces(props: { pieces: PieceBase[], setPieces: (p: PieceBase[], c: number) => void }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [sortingOrder, setOrder] = useState(SortingOrder.Title);
    const router = useRouter();

    useEffect(() => {
        if (!isLoaded) {
            const jwt = getJwt();

            getPieces(jwt).then(res => {
                props.setPieces(res.pieces, res.totalCount);
                setIsLoaded(true);
            });
        }
    }, [isLoaded]);

    const addPiece = () => router.push('/pieces/add');

    return (
        <div className={'items-page pieces-page'}>
            <div className={'main-content'}>
                <header className={'page-header'}>
                    <h2 className={'page-title'}>Pieces</h2>
                    <PrimaryButton label={'Add piece'} className={'add-btn'} onClick={addPiece}/>
                </header>
                <div className={'list-header'}>
                    <div className={'list-label border-radius sort'}>alphabetical</div>
                    <div className={'list-label border-radius counter'}>Total: <span>{props.pieces.length}</span></div>
                </div>
            </div>

            <PiecesList pieces={props.pieces}/>
        </div>
    );
}

const PiecesList = (props: { pieces: PieceBase[] }) => {
    const router = useRouter();

    return (
        <ul className={'pieces-list'}>
            {props.pieces.map(piece => (
                <li className='piece-item' onClick={() => router.push('/pieces/' + piece.id)} key={piece.id}>

                    {piece.imageUri && <>
                        <img src={piece.imageUri} className={'pic'}/>
                        <div className={'pic-overlay'}/>
                    </>}

                    <h3 className={'piece-name item-name'}><Link href={'/pieces/' + piece.id}>{piece.name}</Link></h3>
                    {piece.tags.length > 0 && <TagList tags={piece.tags}/>}
                </li>)
            )}
        </ul>
    );
};

const getPieces = async (token: string) => await fetch('/api/pieces', {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        'Authorization': token
    }
}).then(resp => resp.json());

const mapDispatchToProps = (dispatch: any) => ({
    setPieces: (pieces: PieceBase[], count: number) => dispatch(setPiecesMeta(pieces, count)),
});

const mapStateToProps = (state: StateShape) => ({
    pieces: state.pieces.items,
});

export default connect(mapStateToProps, mapDispatchToProps)(Pieces);
