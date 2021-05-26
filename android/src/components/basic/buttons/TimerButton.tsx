import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { useTheme } from "../../../theme";
import { TimerButtonStyle as getStyles } from "../../../AppStyle";
import { DeviceSize, useDeviceSize } from "../adaptive/query";

const IconSize = {
    [DeviceSize.Small]: 24,
    [DeviceSize.Medium]: 26,
    [DeviceSize.Big]: 42,
};

type ButtonProps = {
    onPress?: () => void,
}

const TimerButton = (props: ButtonProps & { label: string, icon?: string }) => {
    const colors = useTheme().colors;
    const size = useDeviceSize();
    const styles = getStyles(colors, size);

    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.wrap}>
                <MaterialIcons name={props.icon} color={colors.color} size={IconSize[size]}/>
                <Text style={styles.label}>
                    {props.label}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export const NextButton = (props: ButtonProps & { label?: string }) => (
    <TimerButton onPress={props.onPress} icon={'skip-next'} label={props.label ? props.label : 'Next'}/>
);

export const BreakButton = (props: ButtonProps) => (
    <TimerButton onPress={props.onPress} icon={'free-breakfast'} label='Break'/>
);

export const FinishButton = (props: ButtonProps) => (
    <TimerButton onPress={props.onPress} icon={'stop'} label='Finish'/>
);

export const ResumeButton = (props: ButtonProps) => (
    <TimerButton onPress={props.onPress} icon={'play-arrow'} label='Resume'/>
);

type WrapperProps = {
    children: JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[],
    style?: ViewStyle,
}

export const TimerButtonsWrapper = (props: WrapperProps) => (
    <View style={{...wrapStyle, ...props.style}}>
        {props.children}
    </View>
);

const wrapStyle: ViewStyle = {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
};
