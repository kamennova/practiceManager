import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { ListItemStyle } from "../../AppStyle";
import { PIECE } from "../../NavigationPath";
import { Piece } from "../../types/Piece";

export const PiecesList = (props: { pieces: Piece[] }) => {
    const navigation = useNavigation();

    return (
        <View style={{}}>
            {props.pieces.map(piece => (
                <PieceItem onPress={() => navigation.navigate(PIECE, { piece: piece })} {...piece} />
            ))}
        </View>
    );
};

const PieceItem = (props: Piece & { onPress: () => void }) => (
    <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={ListItemStyle}>
            <PieceName>
                {props.name}
            </PieceName>
            {props.authors.length > 0 ? <PieceAuthor authors={props.authors}/> : undefined}
        </View>
    </TouchableWithoutFeedback>
);

const PieceName = (props: { children: string }) => (
    <Text style={{
        fontSize: 18,
        marginBottom: 3,
    }}>
        {props.children}
    </Text>
);

const PieceAuthor = (props: { authors: string[] }) => (
    <Text style={{
        fontSize: 14,
        color: 'grey',
    }}>
        {props.authors.reduce((a, b) => a + ', ' + b)}
    </Text>
);
