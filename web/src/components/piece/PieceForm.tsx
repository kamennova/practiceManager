import { Piece } from 'common/types/piece';
import { Tag } from 'common/types/Tag';
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import { getJwt } from "../../ts/hooks";
import { getUserTags } from "../../utils/requests";
import { Button, PrimaryButton } from "../Button";
import { FormControl } from "../FormControl";
import { AuthorInput } from "../inputs/AuthorInput";
import { PieceComplexitySelect } from "../inputs/ComplexitySelect";
import { ImageLinkInput } from "../inputs/ImageLink";
import { MoodSelect } from "../inputs/MoodSelect";
import { Select } from "../inputs/Select";
import { TextInput } from "../inputs/TextInput";
import { ItemMenuSmall } from "../Item/ItemMenuSmall";

export enum FormMode {
    Create, Edit
}

export const PieceForm = (props: { mode: FormMode, piece: Piece, onSubmit: (p: Piece) => void }) => {
    const [piece, setPiece] = useState<Piece>(props.piece);
    const [error, setError] = useState<{ location: string, message: string } | null>(null);
    const [tags, setTags] = useState<Tag[]>([]);

    const setProperty = (prop: keyof Piece) => {
        return (val: string | any) => {
            setPiece({ ...piece, [prop]: val });
        }
    };
    const router = useRouter();

    useEffect(() => {
        const jwt = getJwt();
        getUserTags(jwt).then(({ results }) => setTags(results));
    }, []);

    const setPieceTag = (tagId: string) => {
        const tag = tags.find(t => t.id === Number(tagId));

        if (tag !== undefined) {
            setPiece({ ...piece, tags: [tag] });
        }
    };

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

                <FormControl label={'Tag'}>
                    <Select value={piece.tags.length > 0 ? piece.tags[0].id.toString() : undefined}
                            options={tags.map(t => ({ label: t.name, value: t.id.toString() }))}
                            onChange={setPieceTag}/>
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
                    <Button onClick={() => setProperty('inWishlist')(!piece.inWishlist)}>
                        <span>
                        <i className={'material-icons'} style={{fontSize: 14, marginRight: 5}}>
                            {piece.inWishlist ? 'done' : 'loyalty'}</i>
                            {piece.inWishlist ? 'In wishlist' : 'Add to wishlist'}
                        </span>
                    </Button>
                    <PrimaryButton onClick={onSubmit} label={'Add'}/>
                </div>
            </div>
        </div>
    );
};
