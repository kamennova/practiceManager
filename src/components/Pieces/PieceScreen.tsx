import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Route, ScrollView, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { AppPaddingStyle } from "../../AppStyle";
import { getPieceById } from "../../db/db";
import { PIECE_FORM, REPERTOIRE } from "../../NavigationPath";
import { StateShape } from "../../store/StoreState";
import { thunkDeletePiece, thunkTogglePieceFav } from "../../store/thunks";
import { ActionType } from "../../types/ActionType";
import { EmptyPiece } from "../../types/EmptyPiece";
import { Piece, PieceBase } from "../../types/Piece";
import { PrimaryButton } from "../basic/Buttons/Button";
import { NextButton, PrevButton } from "../basic/Buttons/Direction";
import { ConfirmDeleteModal } from "../basic/ConfrmDeleteModal";
import { ItemButtonsWrap } from "../basic/ItemButtons";
import { ScreenWrapper } from "../basic/ScreenWrapper";
import { ScreenTitle } from "../basic/Titles/Titles";
import { Features } from "./PieceFeatures";
import { PieceNotes } from "./PieceNotes";
import { PieceNotifications } from "./PieceNotifications";
import { PieceTags } from "./PieceTags";

type PieceScreenProps = {
    route: Route & { params: { id: number, lastUpdated?: number } },
    sideIds: {
        next?: number,
        prev?: number,
    },
    preview?: PieceBase,
    navigation: any,
    deletePiece: () => void,
    togglePieceFav: () => void,
}

const mapStateToProps = (state: StateShape, ownProps: PieceScreenProps) => ({
        sideIds: getSideIds(state.pieces.items, ownProps.route.params.id),
        preview: state.pieces.items.find(i => i.id === ownProps.route.params.id),
    }
);

const mapDispatchToProps = (dispatch: any, ownProps: PieceScreenProps) => ({
    deletePiece: () => dispatch(thunkDeletePiece(ownProps.route.params.id)),
    togglePieceFav: () => dispatch(thunkTogglePieceFav(ownProps.route.params.id)),
});

const getSideIds = (items: PieceBase[], id: number): { prev?: number, next?: number } => {
    const index: number = items.findIndex(i => i.id === id);

    return {
        next: (index === -1 || index === items.length - 1) ? undefined : items[index + 1].id,
        prev: (index <= 0) ? undefined : items[index - 1].id
    };
};

const PieceComponent = (props: PieceScreenProps) => {
    const pieceInit = { ...EmptyPiece, ...props.preview };
    const [showDeleteModal, updateShowDeleteModal] = useState(false),
        [piece, setPiece] = useState<Piece>(pieceInit),
        nav = useNavigation(),
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

    const onDelete = async () => {
        updateShowDeleteModal(false);
        await props.deletePiece();
        nav.navigate(REPERTOIRE);
    };

    const updatePieceFav = () => {
        props.togglePieceFav();
        setPiece({ ...piece, isFavourite: !piece.isFavourite });
    };

    const toggleNotifs = () => {
        setPiece({ ...piece, notifsOn: !piece.notifsOn });
    };

    const setInterval = (i: number) => {
        setPiece({ ...piece, notifsInterval: i });
    };

    const menu = [
        { label: 'Edit', func: () => nav.dispatch(StackActions.push(PIECE_FORM, { mode: ActionType.Edit, piece })) },
        { label: 'Delete', func: () => updateShowDeleteModal(true) },
    ];

    // @ts-ignore
    const next = props.sideIds.next !== undefined ? () => nav.dispatch(push(props.sideIds.next)) : undefined;
    // @ts-ignore
    const prev = props.sideIds.prev !== undefined ? () => nav.dispatch(push(props.sideIds.prev)) : undefined;

    return (
        <ScreenWrapper itemMenu={menu} fav={{ val: piece.isFavourite, update: updatePieceFav }}>

            <ScrollView contentContainerStyle={styles.scroll}>
                {showPic && piece.imageUri !== undefined ? <PieceImage uri={piece.imageUri}/> : undefined}

                <View style={{
                    ...AppPaddingStyle,
                    paddingTop: showPic ? 10 : 100,
                    paddingBottom: 22,
                }}>
                    <PieceTags tags={piece.tags}/>
                    <ScreenTitle>{piece.name}</ScreenTitle>
                    {piece.authors.length > 0 ? <PieceAuthors authors={piece.authors}/> : undefined}

                    <Features timeSpent={piece.timeSpent} lastPracticed={piece.lastPracticedOn} status={piece.status}/>
                </View>

                <PieceNotes notes={piece.notes}/>

                <PieceNotifications interval={piece.notifsInterval} enabled={piece.notifsOn}
                                    updateInterval={setInterval} updateEnabled={toggleNotifs}/>
            </ScrollView>

            {showDeleteModal ?
                <ConfirmDeleteModal onCancel={() => updateShowDeleteModal(false)} onOk={onDelete}/> : undefined}

            <ItemButtonsWrap>
                <PrevButton
                    onPress={prev}/>
                <PrimaryButton style={styles.primary}>Practice</PrimaryButton>
                <NextButton
                    onPress={next}/>
            </ItemButtonsWrap>
        </ScreenWrapper>
    );
};

const PieceAuthors = (props: { authors: string[] }) => (
    <Text style={styles.authors}>
        {props.authors.reduce((a, b) => a + ', ' + b)}
    </Text>
);

const PieceImage = (props: { uri: string }) => (
    <Image source={{ uri: props.uri }} style={styles.pic}/>
);

const PieceScreen = connect(mapStateToProps, mapDispatchToProps)(PieceComponent);
export default PieceScreen;

const styles = StyleSheet.create({
    pic: { width: '100%', height: 300 },
    authors: { fontSize: 17, marginBottom: 15, color: 'grey' },
    primary: { marginRight: 15, marginLeft: 15 },
    scroll: { paddingBottom: 65 }
});
