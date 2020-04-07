import React from 'react';
import { Image, ImageSourcePropType, Text, TouchableWithoutFeedback, View } from "react-native";
import { ButtonProps } from "./ButtonProps";

export const TimerButton = (props: ButtonProps & { icon?: ImageSourcePropType }) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={{
                padding: 16,
                paddingLeft: 8,
                paddingRight: 8,
                marginRight: -2,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 2,
                borderColor: 'darkgrey',
                justifyContent: 'center',
                alignItems: 'center',
                flexBasis: '33%',
                flexGrow: 1,
                flexDirection: 'row',
                ...props.style,
            }}>
                {props.icon !== undefined ?
                    <Image style={{ width: 23, height: 23, opacity: 0.5, marginBottom: 0, marginRight: 5, }}
                           source={props.icon}/> : undefined}
                <Text style={{
                    fontSize: 16,
                    textAlign: 'center',
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    ...props.textStyle,
                }}>
                    {props.children}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export const NextButton = (props: ButtonProps) => (
    <TimerButton textStyle={props.textStyle} style={props.style} onPress={props.onPress}
                 icon={require('../../../../assets/skip_next.png')}>
        {props.children}
    </TimerButton>
);

export const BreakButton = (props: ButtonProps) => (
    <TimerButton textStyle={props.textStyle} style={props.style} onPress={props.onPress}
                 icon={require('../../../../assets/pause.png')}>
        {props.children}
    </TimerButton>
);

export const FinishButton = (props: ButtonProps) => (
    <TimerButton textStyle={props.textStyle} style={props.style} onPress={props.onPress}
                 icon={require('../../../../assets/stop.png')}>
        {props.children}
    </TimerButton>
);

export const ResumeButton = (props: ButtonProps) => (
    <TimerButton textStyle={props.textStyle} style={props.style} onPress={props.onPress}
                 icon={require('../../../../assets/play.png')}>
        {props.children}
    </TimerButton>
);

export const TimerButtonsWrapper = (props: { children: JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[] }) => (
    <View style={{
        marginTop: 'auto',
        flexDirection: 'row',
        justifyContent: 'center'
    }}>
        {props.children}
    </View>
);
