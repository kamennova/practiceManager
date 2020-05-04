import * as React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { useTheme } from "../../theme";
import { ThemeColors } from "../../theme/colors";

type WidgetsProps = {
    isVisible: boolean,
    toggleIsVisible: () => void,
};

export const TimerWidgets = (props: WidgetsProps) => {
    return (
        <View>
            {props.isVisible ? <WidgetsList/> : <WidgetsButton onPress={props.toggleIsVisible}/>}
        </View>
    );
};

const WidgetsList = () => {
    return (
        <View>
            <Text>Metronome, tuner, player, recorder</Text>
        </View>
    );
};

const WidgetsButton = (props: { onPress: () => void }) => {
    const styles = getStyles(useTheme().colors);

    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={styles.wrap}>
                <Text style={styles.text}>Widgets</Text>
            </View>
        </TouchableNativeFeedback>
    );
};

const getStyles = (colors: ThemeColors) => StyleSheet.create({
    wrap: {
        marginTop: 30,
        padding: 12,
        paddingLeft: 18,
        paddingRight: 18,
        borderWidth: 1,
        borderColor: colors.borderFaded,
    },
    text: {
        color: colors.color,
    },
});
