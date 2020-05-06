import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { useTheme } from "../../../theme";
import { TimerButtonStyle as getStyles } from "../../../AppStyle";

const IconSize = 24;

type ButtonProps = {
    onPress?: () => void,
}

const TimerButton = (props: ButtonProps & { label: string, icon?: string }) => {
    const colors = useTheme().colors;
    const styles = getStyles(colors);

    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.wrap}>
                <MaterialIcons name={props.icon} color={colors.color} size={IconSize}/>
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

export const TimerButtonsWrapper = (props: { children: JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[] }) => (
    <View style={wrapStyle}>
        {props.children}
    </View>
);

const wrapStyle: ViewStyle = {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
};
