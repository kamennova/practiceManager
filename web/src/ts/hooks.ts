import { EmptyPiece } from "common/types/piece/EmptyPiece";
import { EmptyPlan } from "common/types/plan/EmptyPlan";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getPieceQuery, getPlanQuery } from "../utils/requests";
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

export const usePlan = () => {
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [piece, setPiece] = useState(EmptyPlan);

    useEffect(() => {
        const func = async () => {
            if (!loaded) {
                const token = getJwt();

                getPlanQuery(Number(router.query.id), token).then(res => {
                    if (res.error !== undefined) {
                        console.log(res.error);
                    } else {
                        setPiece(res.plan);
                        setLoaded(true);
                    }
                });
            }
        };

        func();
    }, []);

    return piece;
};

export const getJwt = () => {
    const token = getCookie('authToken');

    if (token === undefined) {
        throw Error('Jwt');
    }
    return token;
};
