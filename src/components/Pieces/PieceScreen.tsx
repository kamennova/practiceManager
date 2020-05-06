import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { AppPaddingStyle } from "../../AppStyle";
import { getPieceById } from "../../db/piece";
import { cancelPieceNotif, schedulePieceNotif, updatePieceNotifInterval } from "../../notifications";
import { StateShape } from "../../store/StoreState";
import { thunkDeletePiece, thunkTogglePieceFav } from "../../store/thunks";
import { ThemeColors, useTheme } from "../../theme";
import { EmptyPiece } from "../../types/EmptyPiece";
import { ItemScreenProps } from "../../types/item/ItemScreen";
import { Piece, PieceBase } from "../../types/Piece";
import { getSideIds } from "../basic/Item/getSideIds";
import { ItemScreenWrapper } from "../basic/Item/ItemScreenWrapper";
import { ScreenTitle } from "../basic/Titles/Titles";
import { PieceFeatures } from "./PieceFeatures";
import { PieceNotes } from "./PieceNotes";
import { PieceNotifications } from "./PieceNotifications";
import { PieceTags } from "./PieceTags";

type PieceScreenProps = ItemScreenProps<PieceBase>;

const PieceComponent = (props: PieceScreenProps) => {
    const pieceInit = { ...EmptyPiece, ...props.preview };
    const [piece, setPiece] = useState<Piece>(pieceInit),
        showPic = piece.imageUri !== undefined && piece.imageUri !== '';

    useEffect(() => {
        const fetchData = async () => {
            const result = await getPieceById(props.route.params.id);
            if (result !== undefined) {
                setPiece(result);
            } else {
                throw new Error('Piece not found');
            }
        };

        fetchData();
    }, [props.route.params.id, props.route.params.lastUpdated]);

    const toggleNotifs = async () => {
        const notifsOn = !piece.notifsOn;
        const notifId = notifsOn ? await schedulePieceNotif(piece) : null;

        if (!notifsOn && piece.notifId !== null) {
            await cancelPieceNotif(piece.id, piece.notifId);
        }

        setPiece({ ...piece, notifId, notifsOn });
    };

    const setInterval = async (i: number) => {
        setPiece({ ...piece, notifsInterval: i });
        await updatePieceNotifInterval(piece);
    };

    return (
        <ItemScreenWrapper itemName={"piece"}
                           route={props.route}
                           sideIds={props.sideIds}
                           setItem={(p: Piece) => setPiece(p)}
                           deleteItem={props.deleteItem} toggleItemFav={props.toggleItemFav} item={piece}>

            {showPic && piece.imageUri !== undefined ? <PieceImage uri={piece.imageUri}/> : undefined}

            <View style={{
                ...AppPaddingStyle,
                paddingTop: showPic ? 10 : 100,
                paddingBottom: 22,
            }}>
                <PieceTags tags={piece.tags}/>
                <ScreenTitle>{piece.name}</ScreenTitle>
                {piece.authors.length > 0 ? <PieceAuthors authors={piece.authors}/> : undefined}

                <PieceFeatures timeSpent={piece.timeSpent} lastPracticed={piece.lastPracticedOn}
                               status={piece.status}/>
            </View>

            <PieceNotes notes={piece.notes}/>

            <PieceNotifications interval={piece.notifsInterval} enabled={piece.notifsOn}
                                updateInterval={setInterval} updateEnabled={toggleNotifs}/>

        </ItemScreenWrapper>
    );
};

const PieceAuthors = (props: { authors: string[] }) => {
    const colors = useTheme().colors;
    return (
        <Text style={getStyles(colors).authors}>
            {props.authors.join(', ')}
        </Text>
    )
};

const PieceImage = (props: { uri: string }) => (<Image source={{ uri: props.uri }} style={picStyles}/>);

const mapStateToProps = (state: StateShape, ownProps: PieceScreenProps) => ({
        sideIds: getSideIds(state.pieces.items, ownProps.route.params.id),
        preview: state.pieces.items.find(i => i.id === ownProps.route.params.id),
    }
);

const mapDispatchToProps = (dispatch: any, ownProps: PieceScreenProps) => ({
    deleteItem: () => dispatch(thunkDeletePiece(ownProps.route.params.id)),
    toggleItemFav: () => dispatch(thunkTogglePieceFav(ownProps.route.params.id)),
});

const PieceScreen = connect(mapStateToProps, mapDispatchToProps)(PieceComponent);
export default PieceScreen;

const getStyles = (colors: ThemeColors) => StyleSheet.create({
    authors: { fontSize: 15, marginBottom: 15, color: colors.colorFaded },
});

const picStyles = { width: '100%', height: 300 };
