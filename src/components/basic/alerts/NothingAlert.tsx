import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const NothingAlert = () => (
    <View style={style.wrap}>
        <Text style={style.text}>Nothing here yet!</Text>
    </View>
);

const style = StyleSheet.create({
    text: {
        fontSize: 17,
        color: 'grey',
    },
    wrap: {
        alignSelf: 'center',
        marginTop: 200,
    }
});
