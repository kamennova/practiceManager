import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, Text, TextStyle, TouchableNativeFeedback, View } from "react-native";
import { ListItemStyle, ListItemTitleStyle, PieceListStyle as stylesFunc } from "../../AppStyle";
import { PIECE } from "../../NavigationPath";
import { Theme, useTheme } from "../../theme";
import { PieceBase } from "../../types/Piece";
import { NothingAlert } from "../basic/Alerts/NothingAlert";

export const PiecesList = (props: { pieces: PieceBase[] }) => {
    const navigation = useNavigation();

    return (
        <View>
            {props.pieces.length === 0 ? <NothingAlert/> : undefined}
            <FlatList data={props.pieces}
                      renderItem={({ item }) => (
                          <PieceItem key={item.id.toString()}
                                     onPress={() => navigation.navigate(PIECE, { id: item.id })} {...item} />)}/>
        </View>
    );
};

const PieceItem = (props: PieceBase & { onPress: () => void }) => {
    const theme = useTheme();
    const styles = stylesFunc(theme.colors, theme.theme);

    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={ListItemStyle(theme.colors)}>
                <View style={styles.itemWrap}>
                    <PieceName style={ListItemTitleStyle(theme.colors)}>
                        {props.name}
                    </PieceName>
                    {props.authors.length > 0 ?
                        <PieceAuthor style={styles.author} authors={props.authors}/> : undefined}
                </View>
                {props.imageUri !== undefined && props.imageUri !== '' ? [
                    <Image style={styles.image} source={{ uri: props.imageUri }}/>,
                    <Image source={theme.theme !== Theme.Dark ? require('../../../assets/grad_white.png') :
                        require('../../../assets/grad_dark.png')}
                           style={{ ...styles.imageTop }}/>,
                ] : undefined}
            </View>
        </TouchableNativeFeedback>
    )
};

const PieceName = (props: { children: string, style?: TextStyle }) => (
    <Text style={props.style}>
        {props.children}
    </Text>
);

const PieceAuthor = (props: { authors: string[], style?: TextStyle }) => (
    <Text style={props.style}>
        {props.authors.reduce((a, b) => a + ', ' + b)}
    </Text>
);
