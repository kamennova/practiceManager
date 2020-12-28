import { setPiecesMeta } from "common/store/actions";
import { StateShape } from "common/store/StoreState";
import { PieceBase } from "common/types/piece";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Button } from "../../components/Button";
import { getJwt } from "../../ts/hooks";

function Pieces(props: { pieces: PieceBase[], setPieces: (p: PieceBase[]) => void }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!isLoaded) {
            const jwt = getJwt();

            getPieces(jwt).then(res => {
                props.setPieces(res.pieces);
                setIsLoaded(true);
            });
        }
    }, [isLoaded]);

    const addPiece = () => router.push('/pieces/add');

    return (
        <div className={'pieces-page'}>
            <header className={'page-header'}>
                <h2>Pieces</h2>
                <Button className={'add-btn'} onClick={addPiece}>Add piece</Button>
            </header>

            <div className={'counters'}>
                <p>Total: <span>{props.pieces.length}</span></p>
            </div>
            <ul className={'pieces-list'}>
                {props.pieces.map(piece => <PieceItem piece={piece}/>)}
            </ul>
        </div>
    );
}

const PieceItem = (props: { piece: PieceBase }) => (
    <li className='piece-item' key={props.piece.id}>
        <h3><Link href={'/pieces/' + props.piece.id}>{props.piece.name}</Link></h3>
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
    setPieces: (pieces: PieceBase[]) => dispatch(setPiecesMeta(pieces)),
});

const mapStateToProps = (state: StateShape) => ({
    pieces: state.pieces.items,
});

export default connect(mapStateToProps, mapDispatchToProps)(Pieces);
