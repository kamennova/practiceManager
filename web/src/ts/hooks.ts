import { EmptyPiece } from "common/types/piece/EmptyPiece";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie } from "./helpers";

export const usePiece = () => {
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [piece, setPiece] = useState(EmptyPiece);

    useEffect(() => {
        const func = async () => {
            if (!loaded) {
                const token = getJwt();

                getPieceQuery(Number(router.query.id), token).then(res => {
                    if (res.error !== undefined) {
                        console.log(res.error);
                    } else {
                        setPiece(res.piece);
                        setLoaded(true);
                    }
                });
            }
        };

        func();
    }, []);

    return piece;
};

const getPieceQuery = async (id: number, token: string) => await fetch(`/api/pieces/${id}`, {
    method: 'GET',
    headers: { authorization: token }
}).then(res => res.json());

export const getJwt = () => {
    const token = getCookie('authToken');

    if (token === undefined) {
        throw Error('Jwt');
    }
    return token;
};
