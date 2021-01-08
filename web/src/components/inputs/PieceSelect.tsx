import { connect } from "react-redux";
import { getJwt } from "../../ts/hooks";
import { TextInputTips } from "./TextInputTips";
import React from 'react';
import { PieceBase } from 'common/types/piece';
import { StateShape } from 'common/store/StoreState';
import { Tip } from 'common/types/Tip';

const Select = (props: { items: PieceBase[], itemsCount: number, value?: Tip, onChange: (t?: Tip) => void }) => {
    const getTips = async (input: string) => {
        if (props.itemsCount === props.items.length) { // we can search in redux state
            const str = input.toLowerCase();
            return Promise.resolve(props.items.filter(item => item.name.toLowerCase().includes(str))
                .map(item => ({ label: item.name, picSrc: item.imageUri, id: item.id })));
        }

        return await getTipsQuery(input, getJwt());
    };

    return (
        <TextInputTips onSelect={props.onChange}
                       getTips={getTips}
                       allowCreate={false}
                       value={props.value ? { ...props.value, label: props.value.name } : undefined}/>
    );
};

const getTipsQuery = async (input: string, token: string) => await fetch(`/api/pieces/tips/${input}`, {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        'Authorization': token
    }
}).then(resp => resp.json());

const mapStateToProps = (state: StateShape) => ({
    items: state.pieces.items,
    itemsCount: state.pieces.totalCount,
});

export const PieceSelect = connect(mapStateToProps)(Select);
