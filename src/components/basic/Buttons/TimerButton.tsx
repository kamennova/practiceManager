import React from 'react';
import { Image, ImageSourcePropType, Text, TouchableWithoutFeedback, View } from "react-native";
import { ButtonProps } from "./ButtonProps";

export const TimerButton = (props: ButtonProps & { icon?: ImageSourcePropType }) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={{
                padding: 15,
                paddingLeft: 8,
                paddingRight: 8,
                borderWidth: 1,
                borderColor: 'grey',
                justifyContent: 'center',
                alignItems: 'center',
                flexBasis: '33%',
                ...props.style,
            }}>
                {props.icon !== undefined ?
                    <Image style={{ width: 25, height: 25, opacity: 0.5, marginBottom: 5, }}
                           source={props.icon}/> : undefined}
                <Text style={{
                    fontSize: 13,
                    textAlign: 'center',
                    alignSelf: 'center',
                    ...props.textStyle,
                }}>
                    {props.children}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export const TimerNextButton = (props: ButtonProps) => (
    <TimerButton textStyle={props.textStyle} style={props.style} onPress={props.onPress}
                 icon={require('../../../assets/skip_next.png')}>
        {props.children}
    </TimerButton>
);

export const TimerBreakButton = (props: ButtonProps) => (
    <TimerButton textStyle={props.textStyle} style={props.style} onPress={props.onPress}
                 icon={require('../../../assets/pause.png')}>
        {props.children}
    </TimerButton>
);

export const TimerFinishButton = (props: ButtonProps) => (
    <TimerButton textStyle={props.textStyle} style={props.style} onPress={props.onPress}
                 icon={require('../../../assets/stop.png')}>
        {props.children}
    </TimerButton>
);

export const TimerResumeButton = (props: ButtonProps) => (
    <TimerButton textStyle={props.textStyle} style={props.style} onPress={props.onPress}
                 icon={require('../../../assets/play.png')}>
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
