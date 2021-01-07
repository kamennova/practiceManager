import { Author } from 'common/types/piece/Piece';
import { Tip } from 'common/types/Tip';
import React from "react";
import { getJwt } from "../../ts/hooks";
import { TextInputTips } from "./TextInputTips";

const Input = (props: { value?: Author, onChange: (v?: Author) => void }) => {
    const getTips = async (input: string) => {
        const res = await getTipsQuery(input, getJwt());

        return res.results.map(item => ({label: item.fullName, picSrc: item.picSrc, id: item.id}));
    };

    const onSelect = (t?: Tip) => props.onChange(t ? {fullName: t.label, picSrc: t.picSrc, id: t.id} : undefined);

    return (
        <TextInputTips onSelect={onSelect}
                       allowCreate={true}
                       value={props.value ? { label: props.value.fullName, id: props.value.id } : undefined}
                       getTips={getTips}/>
    );
};

const getTipsQuery = async (input: string, token: string): Promise<{results: Author[]}> => await fetch(`/api/authors/?name=${input}`, {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        'Authorization': token
    }
}).then(resp => resp.json());


export const AuthorInput = Input;
