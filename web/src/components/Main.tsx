import { setPiecesMeta } from "common/store/actions";
import { PieceBase } from "common/types/piece";
import React from 'react';
import { connect } from "react-redux";

type MainProps = {
    children: JSX.Element | JSX.Element[],
}

const MainComponent = (props: MainProps) => {

    return (
        <>
            {props.children}
        </>
    );
};

const mapDispatchToProps = (dispatch: any) => ({
    setPieces: (pieces: PieceBase[]) => dispatch(setPiecesMeta(pieces)),
});

export const Main = connect(undefined, mapDispatchToProps)(MainComponent);
