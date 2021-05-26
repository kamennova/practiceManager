import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, Text, TextStyle, TouchableNativeFeedback, View } from "react-native";
import { ListItemTitleStyle, PieceItemStyle, PieceListStyle as getStyles } from "../../AppStyle";
import { PIECE } from "../../NavigationPath";
import { Theme, useTheme } from "../../theme";
import { ThemeColors } from "../../theme/colors";
import { PieceBase } from "common/types/piece";
import { useDeviceSize } from "../basic/adaptive/query";
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
    const size = useDeviceSize();
    const styles = getStyles(theme.colors, theme.theme, size);

    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={PieceItemStyle(theme.colors)}>
                <View style={styles.itemWrap}>
                    <PieceName style={ListItemTitleStyle(theme.colors, size)}>
                        {props.name}
                    </PieceName>
                    {props.author !== undefined ?
                        <PieceAuthor author={props.author}/> : undefined}
                </View>
                {props.imageUri !== undefined && props.imageUri !== '' ? [
                    <Image style={styles.image} source={{ uri: props.imageUri }}/>,
                    <Image source={theme.theme !== Theme.Dark ? require('../../../assets/grad_white.png') :
                        require('../../../assets/grad_dark.png')}
                           style={styles.imageTop}/>,
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

const PieceAuthor = (props: { author: string }) => (
    <Text style={getStyles(useTheme().colors, undefined, useDeviceSize()).author}>
        {props.author}
    </Text>
);
