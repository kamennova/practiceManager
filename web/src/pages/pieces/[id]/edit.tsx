import { editPiece } from 'common/store/actions/piece';
import { Piece } from "common/types/piece";
import { useRouter } from "next/router";
import React from 'react';
import { connect } from "react-redux";
import { FormMode, PieceForm } from "../../../components/piece/PieceForm";
import { getJwt, usePiece } from "../../../ts/hooks";
import { updatePieceQuery } from "../../../utils/requests";

function EditPiece(props: { updatePiece: (p: Piece) => void }) {
    const piece = usePiece();
    const router = useRouter();

    const onSave = async (updPiece: Piece) => {
        const jwt = getJwt();
        await updatePieceQuery(updPiece, jwt).then(res => {
            if (!res.error) {
                props.updatePiece(updPiece);
                router.push('/pieces/' + piece.id)
            }
        });
    };

    return (
        <PieceForm key={piece.name} mode={FormMode.Edit} piece={piece} onSubmit={onSave}/>
    );
}

const mapDispatchToProps = (dispatch: any) => ({
    updatePiece: (p: Piece) => dispatch(editPiece(p)),
});

export default connect(undefined, mapDispatchToProps)(EditPiece);
