import React from 'react';
import { Route, Text, View } from "react-native";
import { AppPaddingStyle } from "../../AppStyle";
import { Piece } from "../../types/Piece";
import { minutesToHumanlyFormat } from "../../types/Time";
import { ScreenWrapper } from "../basic/ScreenWrapper";
import { ScreenTitle } from "../basic/Titles/Titles";

export const PieceScreen = (props: { route: Route }) => {
    const piece: Piece = props.route.params.piece;

    return (
        <ScreenWrapper>
            <View style={{
                ...AppPaddingStyle
            }}>
                <ScreenTitle>
                    {piece.name}
                </ScreenTitle>
                {piece.authors !== undefined ?
                    <Text>
                        {piece.authors.reduce((a, b) => a + ', ' + b)}
                    </Text>
                    : undefined}
                <Text>
                    Complexity level: intermediate
                </Text>
                <Text>
                    Time spent: {minutesToHumanlyFormat(piece.timeSpent)}
                </Text>
            </View>
        </ScreenWrapper>
    );
};
