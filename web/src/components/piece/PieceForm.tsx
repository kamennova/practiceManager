import { Piece } from 'common/types/piece';
import { useRouter } from "next/router";
import React, { useState } from 'react';
import { PrimaryButton } from "../Button";
import { FormControl } from "../FormControl";
import { AuthorInput } from "../inputs/AuthorInput";
import { PieceComplexitySelect } from "../inputs/ComplexitySelect";
import { ImageLinkInput } from "../inputs/ImageLink";
import { MoodSelect } from "../inputs/MoodSelect";
import { MultipleInput } from "../inputs/MultipleInput";
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
            <ItemMenuSmall toggleFav={() => setProperty('isFavourite')} goBack={router.back} isFav={piece.isFavourite}/>
            <div className={'item-form-page'}>
                <FormControl label={'Title'}>
                    <TextInput name='piece-title' value={piece.name} onChange={setProperty('name')}/>
                </FormControl>

                <FormControl label={'Author'}>
                    <AuthorInput onChange={setProperty('author')}
                                 value={piece.author}/>
                </FormControl>

                <FormControl label={'Cover image'}>
                    <ImageLinkInput onSetImage={setProperty('imageUri')}
                                    image={piece.imageUri}
                                    browseLink={piece.name ?
                                        `https://www.google.com/search?q=${piece.name.split(' ').join('+')}+${piece.author ? piece.author.fullName.split(' ').join("+") : ''}&tbm=isch` : undefined}/>
                </FormControl>

                <FormControl label={'Tags'}>
                    <MultipleInput values={piece.tags} onChange={setProperty('tags')}/>
                </FormControl>

                <div className={'columns'}>
                    <div className={'col-6 col-left'}>
                        <PieceComplexitySelect value={piece.complexity} onChange={setProperty('complexity')}/>
                    </div>

                    <div className={'col-6 col-right'}>
                        <MoodSelect value={piece.mood} onChange={setProperty('mood')}/>
                    </div>
                </div>

                {error && <span>{error.message}</span>}

                <div className={'form-buttons'}>
                    <PrimaryButton onClick={onSubmit} label={'Add'}/>
                </div>
            </div>
        </div>
    );
};
