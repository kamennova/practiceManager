import React from "react";
import { Text, View } from "react-native";
import { ErrorAlertStyle, ErrorAlertTextStyle } from "../../../AppStyle";

export const ErrorAlert = (props: { message: string }) => (
    <View style={ErrorAlertStyle}>
        <Text style={ErrorAlertTextStyle}>{props.message}</Text>
    </View>
);
