import { EmptyPiece } from "common/types/piece";
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import { getCookie } from "../../ts/helpers";

export default function Piece() {
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [piece, setPiece] = useState(EmptyPiece);

    useEffect(() => {
        const func = async () => {
            if (!loaded) {
                const token = getCookie('authToken');

                if (token !== undefined) {
                    fetch(`/api/pieces/${router.query.id}`, {
                        method: 'GET', headers: { authorization: token }
                    }).then((resp) => resp.json())
                        .then(res => {
                            if (res.error !== undefined) {
                                console.log(res.error);
                            } else {
                                setPiece(res.piece);
                                setLoaded(true);
                            }
                        });
                }
            }
        };

        func();
    }, []);

    return (
        <div>{piece.name}</div>
    );
}
