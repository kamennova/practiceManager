import React from 'react';
import { View } from "react-native";
import { AppPaddingStyle } from "../../AppStyle";
import { Piece } from "../../types/Piece";
import { ScreenWrapper } from "../basic/ScreenWrapper";
import { ScreenTitle } from "../basic/Titles/Titles";
import { PieceFilters } from "./PieceFilters";
import { PiecesList } from "./PiecesList";

export const RepertoireScreen = (props: { pieces: Piece[] }) => {
    return (
        <ScreenWrapper>
            <View style={{
                ...AppPaddingStyle
            }}>
                <View style={{
                    marginBottom: 20,
                }}>
                    <ScreenTitle>Repertoire</ScreenTitle>
                    <PieceFilters/>
                </View>
                <PiecesList pieces={props.pieces}/>
            </View>
        </ScreenWrapper>
    );
};
