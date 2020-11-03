import { useState } from "react";
import * as React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { useTheme } from "../../theme";
import { ThemeColors } from "../../theme/colors";

export const TimerWidgets = () => {
    const [showWidgets, setShowWidgets] = useState(false);


    const toggleShowWidgets = () => setShowWidgets(!showWidgets);

    return (
        <View style={{marginBottom: 30}}>
            {showWidgets ? <WidgetsList/> : <WidgetsButton onPress={toggleShowWidgets}/>}
        </View>
    );
};

const WidgetsList = () => {
    return (
        <View style={{height: 30}}>
            <Text>Widgets coming soon!</Text>
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
