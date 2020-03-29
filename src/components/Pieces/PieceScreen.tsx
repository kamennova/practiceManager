import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Route, ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import { AppPaddingStyle } from "../../AppStyle";
import { getPieceById } from "../../db/db";
import { PIECE, PIECE_FORM, REPERTOIRE } from "../../NavigationPath";
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
import { PieceTags } from "./PieceTags";

type PieceScreenProps = {
    route: Route & { params: { id: number, lastUpdated?: number } },
    sideIds: {
        next?: number,
        prev?: number,
    },
    navigation: any,
    deletePiece: () => void,
    togglePieceFav: () => void,
}

const mapStateToProps = (state: StateShape, ownProps: PieceScreenProps) => ({
        sideIds: getSideIds(state.pieces.items, ownProps.route.params.id),
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
    const [showDeleteModal, updateShowDeleteModal] = useState(false),
        [piece, setPiece] = useState<Piece>(EmptyPiece),
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

    const menu = [
        { label: 'Edit', func: () => nav.navigate(PIECE_FORM, { piece: piece, mode: ActionType.Edit }) },
        { label: 'Delete', func: () => updateShowDeleteModal(true) },
    ];

    // @ts-ignore
    const next = props.sideIds.next !== undefined ? () => nav.dispatch(push(props.sideIds.next)) : undefined;
    // @ts-ignore
    const prev = props.sideIds.prev !== undefined ? () => nav.dispatch(push(props.sideIds.prev)) : undefined;

    return (
        <ScreenWrapper itemMenu={menu} fav={{ val: piece.isFavourite, update: updatePieceFav }}>

            <ScrollView contentContainerStyle={{ paddingBottom: 65 }}>
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
            </ScrollView>

            {showDeleteModal ?
                <ConfirmDeleteModal onCancel={() => updateShowDeleteModal(false)} onOk={onDelete}/> : undefined}

            <ItemButtonsWrap>
                <PrevButton
                    onPress={prev}/>
                <PrimaryButton style={{ marginRight: 15, marginLeft: 15 }}>Practice</PrimaryButton>
                <NextButton
                    onPress={next}/>
            </ItemButtonsWrap>
        </ScreenWrapper>
    );
};

const push = (id: number) => StackActions.push(PIECE, { id });

const PieceAuthors = (props: { authors: string[] }) => (
    <Text style={{ fontSize: 17, marginBottom: 15, color: 'grey' }}>
        {props.authors.reduce((a, b) => a + ', ' + b)}
    </Text>
);

const PieceImage = (props: { uri: string }) => (
    <Image source={{ uri: props.uri }} style={{ width: '100%', height: 300 }}/>
);

const PieceScreen = connect(mapStateToProps, mapDispatchToProps)(PieceComponent);
export default PieceScreen;
