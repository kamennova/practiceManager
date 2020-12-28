import { EmptyPiece, Piece } from "common/types/piece";
import { useRouter } from "next/router";
import React from 'react';
import { FormMode, PieceForm } from "../../components/PieceForm";
import { getJwt } from "../../ts/hooks";

export default function AddPiecePage() {
    const router = useRouter();

    const savePiece = async (piece: Piece) => {
        const jwt = getJwt();

        const res = await addPiece(piece, jwt);
        if (res.error !== undefined) {
            console.log(res.error);
        } else {
            router.push('/pieces/' + res.pieceId);
        }
    };

    return (
        <PieceForm mode={FormMode.Create} piece={EmptyPiece} onSubmit={savePiece}/>
    );
}

const addPiece = async (piece: { name: string, isFavourite: boolean }, jwt: string) => await fetch('/api/pieces', {
    method: 'PUT',
    body: JSON.stringify({ ...piece, jwt })
})
    .then(resp => resp.json());

