import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Route, ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import { AppPaddingStyle } from "../../AppStyle";
import { getPieceById } from "../../db/db";
import { PIECE, PIECE_FORM } from "../../NavigationPath";
import { StateShape } from "../../store/StoreState";
import { ActionType } from "../../types/ActionType";
import { EmptyPiece } from "../../types/EmptyPiece";
import { Piece } from "../../types/Piece";
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
    route: Route & { params: { id: number } },
    nextId?: number,
    prevId?: number,
}

const mapStateToProps = (state: StateShape, ownProps: PieceScreenProps) => ({
        nextId: ((): number | undefined => {
            const index: number = state.pieces.items.findIndex(i => i.id === ownProps.route.params.id);

            return (index === -1 || index === state.pieces.items.length - 1) ? undefined : state.pieces.items[index + 1].id;
        })(),
        prevId: (() => {

            const index: number = state.pieces.items.findIndex(i => i.id === ownProps.route.params.id);

            return (index <= 0) ? undefined : state.pieces.items[index - 1].id;
        })()
    }
);

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
    }, [props.route.params.id]);

    const menu = [
        { label: 'Delete', func: () => updateShowDeleteModal(true) },
        { label: 'Edit', func: () => nav.navigate(PIECE_FORM, { piece: piece, mode: ActionType.Edit }) }];

    return (
        <ScreenWrapper transparent={showPic}
                       isMain={false}
                       itemMenu={menu}>

            <ScrollView contentContainerStyle={{ paddingBottom: 65 }}>
                {showPic && piece.imageUri !== undefined ? <PieceImage uri={piece.imageUri}/> : undefined}

                <View style={{
                    ...AppPaddingStyle,
                    paddingTop: 10,
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
                <ConfirmDeleteModal onCancel={() => updateShowDeleteModal(false)}
                                    onOk={() => updateShowDeleteModal(false)}/> : undefined}

            <ItemButtonsWrap>
                <PrevButton
                    onPress={props.prevId !== undefined ? () => nav.navigate(PIECE, { pieceId: props.prevId }) : undefined}/>
                <PrimaryButton style={{ marginRight: 15, marginLeft: 15 }}>Practice</PrimaryButton>
                <NextButton
                    onPress={props.nextId !== undefined ? () => nav.navigate(PIECE, { pieceId: props.nextId }) : undefined}/>
            </ItemButtonsWrap>
        </ScreenWrapper>
    );
};

const PieceAuthors = (props: { authors: string[] }) => (
    <Text style={{ fontSize: 17, marginBottom: 15, color: 'grey' }}>
        {props.authors.reduce((a, b) => a + ', ' + b)}
    </Text>
);

const PieceImage = (props: { uri: string }) => (
    <Image source={{ uri: props.uri }} style={{ width: '100%', height: 300 }}/>
);

export const PieceScreen = connect(mapStateToProps)(PieceComponent);
