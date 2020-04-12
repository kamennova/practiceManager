import React from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { Theme, ThemeColors } from "../../theme";
import { ThemeOptionStyle as getStyles } from "../../AppStyle";
import { ThemeContext, useTheme } from "../../theme";
import { MyPicker } from "../basic/Inputs/Picker";
import { ItemSection } from "../basic/ItemSection";
import { ScreenWrapper } from "../basic/ScreenWrapper";
import { SectionRow } from "../basic/SectionRow";

export const AppSettings = () => {
    return (
        <ScreenWrapper>
            <View>
                <ItemSection title='Session'>
                    <SectionRow label='Encouraging pop-ups'>
                        <Switch/>
                    </SectionRow>
                </ItemSection>
                <ItemSection title='Theme'>
                    <ThemeContext.Consumer>
                        {({ setTheme }) => (
                            <ThemeSelect onChoose={setTheme}/>
                        )}
                    </ThemeContext.Consumer>
                </ItemSection>
                <ItemSection title='Notifications'>
                    <SectionRow label='Disabled'>
                        <Switch/>
                    </SectionRow>
                    <SectionRow label='Sound'>
                        <MyPicker wrapperStyle={styles.picker} items={soundOptions} onValueChange={() => {
                        }} selected={'ggg'}/>
                    </SectionRow>
                </ItemSection>
            </View>
        </ScreenWrapper>
    );
};

const ThemeSelect = (props: { onChoose: (_: Theme) => void }) => (
    <View style={{ flexDirection: 'row', width: '100%', flexGrow: 1, }}>
        <ThemeOption theme={Theme.Light} onChoose={props.onChoose}/>
        <ThemeOption theme={Theme.Dark} onChoose={props.onChoose}/>
    </View>
);

const ThemeOption = (props: { theme: Theme, onChoose: (_: Theme) => void }) => {
    const colors = ThemeColors[props.theme];
    const isActive = useTheme().theme === props.theme;
    const styles = getStyles(colors, isActive);

    return (
        <TouchableOpacity onPress={() => props.onChoose(props.theme)}>
            <View style={styles.option}>
                <Text style={styles.name}>{props.theme}</Text>
                <View style={styles.radio}/>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    picker: {
        marginBottom: 0,
        width: 120,
    },
});

const soundOptions = [
    { val: 'sound1', label: 'sound1' },
    { val: 'sound2', label: 'sound2' },
];
