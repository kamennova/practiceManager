import React from "react";
import { View } from "react-native";
import { DeviceSize, useDeviceSize } from "./query";

export const ColumnsWrap = (props: { child1: any, child2: any }) => {
    const size = useDeviceSize();

    return (
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <View style={{ minWidth: 300, flexGrow: 1, paddingRight: size > DeviceSize.Medium ? 10 : 0 }}>
                {props.child1}
            </View>
            <View style={{ minWidth: 300, flexGrow: 1, paddingLeft: size > DeviceSize.Medium ? 10 : 0 }}>
                {props.child2}
            </View>
        </View>
    );
};
