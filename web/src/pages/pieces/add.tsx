import { EmptyPiece, Piece } from "common/types/piece";
import { useRouter } from "next/router";
import React from 'react';
import { FormMode, PieceForm } from "../../components/piece/PieceForm";
import { getJwt } from "../../ts/hooks";
import { addPiece } from "../../utils/requests";

export default function AddPiecePage() {
    const router = useRouter();

    const savePiece = async (piece: Piece) => {
        const jwt = getJwt();

        const res = await addPiece(piece, jwt);
        if (!res.error) {
            router.push('/pieces/' + res.pieceId);
        }
    };

    return (
        <PieceForm mode={FormMode.Create} piece={EmptyPiece} onSubmit={savePiece}/>
    );
}
