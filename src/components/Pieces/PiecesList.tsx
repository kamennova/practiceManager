import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, Text, TouchableNativeFeedback, View } from "react-native";
import { ListItemStyle, PieceListStyle as styles } from "../../AppStyle";
import { PIECE } from "../../NavigationPath";
import { PieceBase } from "../../types/Piece";

export const PiecesList = (props: { pieces: PieceBase[] }) => {
    const navigation = useNavigation();

    return (
        <View>
            <FlatList data={props.pieces}
                      renderItem={({ item }) => (
                          <PieceItem key={item.id.toString()}
                                     onPress={() => navigation.navigate(PIECE, { id: item.id })} {...item} />)}/>
        </View>
    );
};

const PieceItem = (props: PieceBase & { onPress: () => void }) => (
    <TouchableNativeFeedback onPress={props.onPress}>
        <View style={ListItemStyle}>
            <View style={styles.itemWrap}>
                <PieceName>
                    {props.name}
                </PieceName>
                {props.authors.length > 0 ? <PieceAuthor authors={props.authors}/> : undefined}
            </View>
            {props.imageUri !== undefined && props.imageUri !== '' ? [
                <Image style={styles.image} source={{ uri: props.imageUri }}/>,
                <Image source={require('../../../assets/layer.png')}
                       style={styles.imageTop}/>
            ] : undefined
            }

        </View>
    </TouchableNativeFeedback>
);

const PieceName = (props: { children: string }) => (
    <Text style={styles.pieceName}>
        {props.children}
    </Text>
);

const PieceAuthor = (props: { authors: string[] }) => (
    <Text style={styles.author}>
        {props.authors.reduce((a, b) => a + ', ' + b)}
    </Text>
);
