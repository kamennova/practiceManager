import { Piece, PieceComplexity, PieceMood } from 'common/types/piece';
import { useRouter } from "next/router";
import React, { useState } from 'react';
import { PrimaryButton } from "../Button";
import { FormControl } from "../FormControl";
import { ImageUpload } from "../inputs/ImageUpload";
import { MultipleInput } from "../inputs/MultipleInput";
import { Select } from "../inputs/Select";
import { TextInput } from "../inputs/TextInput";
import { ItemMenuSmall } from "../Item/ItemMenuSmall";

export enum FormMode {
    Create, Edit
}

export const PieceForm = (props: { mode: FormMode, piece: Piece, onSubmit: (p: Piece) => void }) => {
    const [piece, setPiece] = useState<Piece>(props.piece);
    const [error, setError] = useState<{ location: string, message: string } | null>(null);
    const setProperty = (prop: keyof Piece) => {
        return (val: string | any) => {
            setPiece({ ...piece, [prop]: val });
        }
    };
    const router = useRouter();

    const validate = () => {
        if (piece.name.length === 0) {
            setError({ location: 'name', message: 'Title cannot be blank!' });
            return false;
        }

        return true;
    };

    const onSubmit = () => {
        if (validate()) {
            setError(null);
            props.onSubmit(piece);
        }
    };

    return (
        <div className={'main-content'}>
            <ItemMenuSmall toggleFav={() => setProperty('isFavourite')} goBack={() => router.back()}
                           isFav={piece.isFavourite}/>
            <div className={'item-form-page'}>
                <FormControl label={'Title'}>
                    <TextInput name='title' value={piece.name} onChange={setProperty('name')}/>
                </FormControl>

                <FormControl label={'Author'}>
                    <TextInput name='author' value={piece.author} onChange={setProperty('author')}/>
                </FormControl>

                <FormControl label={'Image'}>
                    <ImageUpload onSetImage={setProperty('imageUri')}/>
                </FormControl>

                <FormControl label={'Tags'}>
                    <MultipleInput values={piece.tags} onChange={setProperty('tags')}/>
                </FormControl>

                <FormControl label={'Complexity'}>
                    <Select options={Object.keys(PieceComplexity).map(str => ({ label: str }))}
                            onChange={setProperty('complexity')}/>
                </FormControl>

                <FormControl label={'Mood'}>
                    <Select options={Object.keys(PieceMood).map(str => ({ label: str }))}
                            onChange={setProperty('mood')}/>
                </FormControl>

                {error && <span>{error.message}</span>}

                <div className={'form-buttons'}>
                    <PrimaryButton onClick={onSubmit} label={'Add'}/>
                </div>
            </div>
        </div>
    );
};
