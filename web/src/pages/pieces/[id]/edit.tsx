import { editPiece } from 'common/store/actions/piece';
import { Piece } from "common/types/piece";
import { useRouter } from "next/router";
import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { FormMode, PieceForm } from "../../../components/PieceForm";
import { getJwt, usePiece } from "../../../ts/hooks";

function EditPiece(props: { updatePiece: (p: Piece) => void }) {
    const piece = usePiece();
    const router = useRouter();

    const onSave = async (updPiece: Piece) => {
        const jwt = getJwt();
        await updateQuery(updPiece, jwt).then(res => {
            if (res.error === undefined) {
                props.updatePiece(updPiece);
                router.push('/pieces/' + piece.id)
            }
        });
    };

    useEffect(() => {
        console.log(piece.name + ' loaded');
    }, [piece]);

    return (
        <div>
            {piece.name}
            <PieceForm key={piece.name} mode={FormMode.Edit} piece={piece} onSubmit={onSave}/>
        </div>
    );
}

const updateQuery = async (piece: Piece, jwt: string) => await fetch('/api/pieces/' + piece.id, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        'Authorization': jwt
    },
    body: JSON.stringify({ piece, jwt }),
}).then(resp => resp.json());

const mapDispatchToProps = (dispatch: any) => ({
    updatePiece: (p: Piece) => dispatch(editPiece(p)),
});

export default connect(undefined, mapDispatchToProps)(EditPiece);
