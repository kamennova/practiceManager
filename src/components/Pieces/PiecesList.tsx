import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, Text, TextStyle, TouchableNativeFeedback, View } from "react-native";
import { ListItemTitleStyle, PieceItemStyle, PieceListStyle as stylesFunc } from "../../AppStyle";
import { PIECE } from "../../NavigationPath";
import { Theme, useTheme } from "../../theme";
import { ThemeColors } from "../../theme/colors";
import { PieceBase } from "../../types/piece";
import { NothingAlert } from "../basic/alerts/NothingAlert";

export const PiecesList = (props: { pieces: PieceBase[] }) => {
    const navigation = useNavigation();

    return (
        <View>
            {props.pieces.length === 0 ? <NothingAlert/> :
                <FlatList data={props.pieces}
                          style={borderStyle(useTheme().colors)}
                          renderItem={({ item }) => (
                              <PieceItem key={item.id.toString()}
                                         onPress={() => navigation.navigate(PIECE, { id: item.id })} {...item} />)}/>}
        </View>
    );
};

const borderStyle = (colors: ThemeColors) => ({ borderTopWidth: 1, borderTopColor: colors.borderFaded });

const PieceItem = (props: PieceBase & { onPress: () => void }) => {
    const theme = useTheme();
    const styles = stylesFunc(theme.colors, theme.theme);

    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={PieceItemStyle(theme.colors)}>
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
