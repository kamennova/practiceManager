import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, Text, TouchableNativeFeedback, View } from "react-native";
import { ListItemStyle } from "../../AppStyle";
import { PIECE } from "../../NavigationPath";
import { PieceBase } from "../../types/Piece";

export const PiecesList = (props: { pieces: PieceBase[] }) => {
    const navigation = useNavigation();

    return (
        <View style={{}}>
            <FlatList data={props.pieces}
                      renderItem={({ item }) => <PieceItem
                          onPress={() => navigation.navigate(PIECE, { id: item.id })} {...item} />}
                      keyExtractor={(item) => item.id.toString()}/>
        </View>
    );
};

const PieceItem = (props: PieceBase & { onPress: () => void }) => (
    <TouchableNativeFeedback onPress={props.onPress}>
        <View style={ListItemStyle}>
            <View style={{ padding: 10 }}>
                <PieceName>
                    {props.name}
                </PieceName>
                {props.authors.length > 0 ? <PieceAuthor authors={props.authors}/> : undefined}
            </View>
            {props.imageUri !== undefined && props.imageUri !== '' ? [
                <Image style={{ width: 70, height: '100%', marginLeft: 'auto' }} source={{ uri: props.imageUri }}/>,
                <Image source={require('../../../assets/layer.png')}
                       style={{ height: '100%', width: 70, position: 'absolute', right: 2 }}/>
            ] : undefined
            }

        </View>
    </TouchableNativeFeedback>
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
