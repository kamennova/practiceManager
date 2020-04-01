import React from 'react';
import { Text, StyleSheet } from 'react-native';

export type TitleProps = {
    children: string | string[],
}

export const ScreenTitle = (props: TitleProps) => (
    <Text style={styles.screen}>
        {props.children}
    </Text>
);

export const SmallTitle = (props: { children: string }) => (
    <Text style={styles.small}>
        {props.children}
    </Text>
);

const styles = StyleSheet.create({
    screen: {
        marginBottom: 5,
        color: 'black',
        fontSize: 22,
    },
    small: { marginBottom: 7, color: 'grey' },
});
