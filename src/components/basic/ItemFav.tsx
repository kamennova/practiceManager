import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { HeaderIconWrap } from "../../AppStyle";
import { Ionicons } from '@expo/vector-icons';
import { ThemeColors } from "../../theme";
import { useTheme } from "../../theme";

export const ItemFav = (props: { isFav: boolean, onPress: () => void }) => {
    const colors = useTheme().colors;

    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={style(colors)}>
                {props.isFav ? <Ionicons name='md-star' size={28} color={colors.color}/> :
                    <Ionicons name='md-star-outline' size={28} color={colors.color}/>}
            </View>
        </TouchableWithoutFeedback>
    )
};

const style = (colors: ThemeColors) => ({
    ...HeaderIconWrap(colors),
    marginLeft: 'auto',
    marginRight: 10,
    paddingBottom: 2,
});
