import React from "react";
import { Image, TouchableWithoutFeedback, View } from "react-native";
import { HeaderIconWrap } from "../../AppStyle";

export const ItemFav = (props: { isFav: boolean, onPress: () => void }) => (
    <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={style}>
            <Image
                source={props.isFav ? require('../../../assets/star_filled.png') : require('../../../assets/star_outline.png')}/>
        </View>
    </TouchableWithoutFeedback>
);

const style = { ...HeaderIconWrap, marginLeft: 'auto', marginRight: 10 };
