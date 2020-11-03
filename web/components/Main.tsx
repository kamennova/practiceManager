import { setPiecesMeta } from "common/store/actions";
import { PieceBase } from "common/types/piece";
import React from 'react';
import { connect } from "react-redux";
import { useUser } from "../ts/user";
import { Menu } from "./Menu";

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

type MainProps = {
    // pieces: PieceBase[],
    setPieces: (p: PieceBase[]) => void,
    children: JSX.Element | JSX.Element[],
}

const MainComponent = (props: MainProps) => {
    const userCtx = useUser();
    // const { data, error } = useSwr(`/api/pieces/`, fetcher);
    // console.log(data);

    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     if (data && isLoading) {
    //         console.log('data loaded');
    //         props.setPieces(data);
    //         setIsLoading(false);
    //     }
    //
    // }, [data, isLoading]);

    return (
        <>
            {userCtx.user !== undefined ? <Menu/> : undefined}
            {props.children}
        </>
    );
};

const mapDispatchToProps = (dispatch: any) => ({
    setPieces: (pieces: PieceBase[]) => dispatch(setPiecesMeta(pieces)),
});

export const Main = connect(undefined, mapDispatchToProps)(MainComponent);
