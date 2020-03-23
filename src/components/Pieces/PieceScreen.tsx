import React from 'react';
import { Route, Text, View } from "react-native";
import { AppPaddingStyle } from "../../AppStyle";
import { Piece } from "../../types/Piece";
import { minutesToHumanlyFormat } from "../../types/Time";
import { ScreenWrapper } from "../basic/ScreenWrapper";
import { ScreenTitle } from "../basic/Titles/Titles";

export const PieceScreen = (props: { route: Route & { params: { piece: Piece } } }) => {
    const piece = props.route.params.piece;

    return (
        <ScreenWrapper>
            <View style={{
                ...AppPaddingStyle
            }}>
                <ScreenTitle>
                    {piece.name}
                </ScreenTitle>
                {piece.authors.length > 0 ?
                    <Text>
                        {piece.authors.reduce((a, b) => a + ', ' + b)}
                    </Text>
                    : undefined}
                {piece.tags.length > 0 ? <PieceTags tags={piece.tags}/> : undefined}
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

const PieceTags = (props: { tags: string[] }) => (
    <View style={{ flexDirection: 'row' }}>
        {props.tags.map(tag => <Tag tag={tag}/>)}
    </View>
);

const Tag = (props: { tag: string }) => (
    <View style={{ padding: 25, borderWidth: 1 }}>
        <Text style={{}}>
            {props.tag}
        </Text>
    </View>
);
