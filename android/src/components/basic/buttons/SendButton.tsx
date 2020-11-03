import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableNativeFeedback, View } from "react-native";
import { SendBtnStyles as getStyles, Dark } from "../../../AppStyle";
import { useTheme } from "../../../theme";

export const SendButton = (props: { onSave: () => void }) => {
    const styles = getStyles(useTheme().colors);

    return (
        <TouchableNativeFeedback onPress={props.onSave}>
            <View style={styles.add}>
                <Ionicons name='md-send' size={20} color={Dark}/>
                <Text style={styles.text}>Ok</Text>
            </View>
        </TouchableNativeFeedback>
    );
};
