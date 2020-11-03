import React from 'react';
import { TouchableHighlight, View } from "react-native";
import { DirectionButtonStyle } from "../../../AppStyle";
import { useTheme } from "../../../theme";
import { Direction } from "../../../types/Direction";
import { ChevronIcon } from "../icons/Chevron";

type NavBtnProps = {
    onPress?: () => void
};

const DirectionBtn = (props: { onPress?: () => void, direction: Direction }) => (
    <TouchableHighlight onPress={props.onPress}>
        <View style={DirectionButtonStyle(useTheme().colors, props.onPress === undefined)}>
            <ChevronIcon direction={props.direction}/>
        </View>
    </TouchableHighlight>
);

export const PrevButton = (props: NavBtnProps) => <DirectionBtn direction={Direction.Left} onPress={props.onPress}/>;

export const NextButton = (props: NavBtnProps) => <DirectionBtn direction={Direction.Right} onPress={props.onPress}/>;
