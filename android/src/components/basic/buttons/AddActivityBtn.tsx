import React from "react";
import { Text, TouchableNativeFeedback, View } from "react-native";
import { AddActivityBtnStyle as getStyles } from "../../../AppStyle";
import { useTheme } from "../../../theme";

export const AddActivityBtn = (props: { onPress: () => void }) => {
    const theme = useTheme();
    const styles = getStyles(theme.colors, theme.theme);

    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={styles.activityBtn}>
                <Text style={styles.plus}>+</Text><Text style={styles.activityBtnText}>Add activity</Text>
            </View>
        </TouchableNativeFeedback>
    )
};
