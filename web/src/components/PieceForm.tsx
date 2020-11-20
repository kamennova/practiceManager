import { useRouter } from "next/router";
import React, { useState } from 'react';
import { Piece } from 'common/types/piece';
import { Button } from "./Button";
import { FormControl } from "./FormControl";
import { Checkbox } from "./inputs/Checkbox";
import { ImageUpload } from "./inputs/ImageUpload";
import { TextInput } from "./inputs/TextInput";

export enum FormMode {
    Create, Edit
}

export const PieceForm = (props: { mode: FormMode, piece: Piece, onSubmit: (p: Piece) => void }) => {
    const [piece, setPiece] = useState<Piece>(props.piece);
    const setProperty = (prop: keyof Piece) => {
        return (val: string | any) => setPiece({ ...piece, [prop]: val })
    };
    const router = useRouter();

    return (
        <div className={'item-form-page'}>
            {props.mode === FormMode.Create ? 'Create piece' : 'Edit piece'}
            <FormControl label={'Title'}>
                <TextInput name='title' value={piece.name} onChange={setProperty('name')}/>
            </FormControl>

            <FormControl label={'Author'}>
                <TextInput name='author' value={piece.author} onChange={setProperty('author')}/>
            </FormControl>

            <FormControl label={'Image'}>
                <ImageUpload onSetImage={setProperty('imageUri')}/>
            </FormControl>

            <Checkbox label={'Favourite'} name='isFavourite' value={piece.isFavourite}
                      onChange={setProperty('isFavourite')}/>

            <div className={'form-buttons'}>
                <Button onClick={() => router.back()}>Cancel</Button>
                <Button onClick={() => props.onSubmit(piece)}>Save</Button>
            </div>
        </div>
    );
};
