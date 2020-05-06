import React from "react";
import { View } from "react-native";
import { SessionScreenStyle } from "../../AppStyle";
import { Theme, useTheme } from "../../theme";
import { Activity } from "../../types/Activity";
import { getScreenBgByActivity } from "./Colors";
import { SessionActivityTitle } from "./SessionScreenElements";

type WrapProps = {
    activity: Activity,
    children?: JSX.Element | (JSX.Element | undefined)[] | undefined,
};

export const SessionTimerWrap = (props: WrapProps) => {
    const themeObj = useTheme();
    const bgColor = themeObj.theme !== Theme.Dark ? getScreenBgByActivity(props.activity.type) : themeObj.colors.appBg;

    return (
        <View style={{
            ...SessionScreenStyle,
            backgroundColor: bgColor,
        }}>
            <SessionActivityTitle activity={props.activity}/>
            {props.children}
        </View>
    );
};
