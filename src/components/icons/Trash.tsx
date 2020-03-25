import React from 'react';
import { Image, ImageStyle } from "react-native";

type IconProps = {
    style?: ImageStyle
}

export const TrashIcon = (props: IconProps) => (
    <Image style={props.style} source={require('../../../assets/trash.png')}/>
);
