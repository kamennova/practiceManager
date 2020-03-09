import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from "react-native";
import { AppPaddingStyle } from "../../AppStyle";
import { PIECE_FORM } from "../../NavigationPath";
import { Piece } from "../../types/Piece";
import { AddButton } from "../basic/Buttons/AddButton";
import { ScreenWrapper } from "../basic/ScreenWrapper";
import { ScreenTitle } from "../basic/Titles/Titles";
import { PieceFilters } from "./PieceFilters";
import { PiecesList } from "./PiecesList";

// todo
export const RepertoireScreen = (props: { pieces: Piece[] }) => {
    const nav = useNavigation();

    return (
        <ScreenWrapper>
            <View style={{
                ...AppPaddingStyle
            }}>
                <View style={{
                    marginBottom: 20,
                }}>
                    <ScreenTitle>Repertoire</ScreenTitle>
                    <AddButton onPress={() => nav.navigate(PIECE_FORM)}/>
                    <PieceFilters/>
                </View>
                <PiecesList pieces={props.pieces}/>
            </View>
        </ScreenWrapper>
    );
};
