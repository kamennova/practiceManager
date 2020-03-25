import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Route, ScrollView, Text, View } from "react-native";
import { AppPaddingStyle } from "../../AppStyle";
import { PIECE_FORM } from "../../NavigationPath";
import { ActionType } from "../../types/ActionType";
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

export const PieceScreen = (props: { route: Route & { params: { piece: Piece } } }) => {
    const [showDeleteModal, updateShowDeleteModal] = useState(false);
    const piece = props.route.params.piece,
        nav = useNavigation(),
        showPic = piece.imageUri !== undefined && piece.imageUri !== '';

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
                <PrevButton/>
                <PrimaryButton style={{ marginRight: 15, marginLeft: 15 }}>Practice</PrimaryButton>
                <NextButton/>
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
