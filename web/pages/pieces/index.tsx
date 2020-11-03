import { setPiecesMeta } from "common/store/actions";
import { StateShape } from "common/store/StoreState";
import { PieceBase } from "common/types/piece";
import Link from "next/dist/client/link";
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { getCookie } from "../../ts/helpers";

function Pieces(props: { pieces: PieceBase[], setPieces: (p: PieceBase[]) => void }) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!isLoaded) {
            const jwt = getCookie('authToken');

            if (jwt !== undefined) {
                getPieces(jwt).then(res => {
                    console.log(res);
                    props.setPieces(res.pieces);
                    setIsLoaded(true);
                });

                console.log('load pieces');
            }
        }
    }, [isLoaded]);

    return (
        <div>
            <h2>Pieces</h2>
            <Link href={'/pieces/add'}>Add piece</Link>
            <ul>
                {props.pieces.map(piece => <li>{piece.name}</li>)}
            </ul>
        </div>
    );
}

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
