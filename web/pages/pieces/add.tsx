import { EmptyPiece, Piece } from "common/types/piece";
import { useRouter } from "next/router";
import React, { useState } from 'react';
import { Button } from "../../components/Button";
import { FormControl } from "../../components/FormControl";
import { Checkbox } from "../../components/inputs/Checkbox";
import { TextInput } from "../../components/inputs/TextInput";
import { getCookie } from "../../ts/helpers";

export default function AddPiecePage() {
    const [piece, setPiece] = useState<Piece>(EmptyPiece);
    const setProperty = (prop: keyof Piece) => {
        return (val: string | any) => setPiece({ ...piece, [prop]: val })
    };
    const router = useRouter();

    const savePiece = async () => {
        const jwt = getCookie('authToken');

        if (jwt !== undefined) {
            const res = await addPiece(piece, jwt);
            if (res.error !== undefined) {
                console.log(res.error);
            } else {
                router.push('/pieces/' + res.pieceId);
            }
        }
    };

    return (
        <div>
            Add piece
            <FormControl label={'Title'}>
                <TextInput name='title' value={piece.name} onChange={setProperty('name')}/>
            </FormControl>

            <Checkbox label={'Favourite'} name='isFavourite' value={piece.isFavourite}
                      onChange={setProperty('isFavourite')}/>

            <Button onClick={savePiece}>Save</Button>
        </div>
    );
}

const addPiece = async (piece: { name: string, isFavourite: boolean }, jwt: string) => {
    return await fetch('/api/pieces', { method: 'PUT', body: JSON.stringify({ ...piece, jwt }) })
        .then(resp => resp.json())
};
