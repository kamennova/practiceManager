import React from 'react';
import { View } from "react-native";
import { SmallModalStyle } from "../../AppStyle";
import { useTheme } from "../../theme";
import { Button, MinorButton } from "./buttons/Button";
import { ModalTitle } from "./titles/ModalTitle";

export const ConfirmDeleteModal = (props: { onCancel: () => void, onOk: () => void }) => {
    return (
        <View style={SmallModalStyle(useTheme().colors)}>
            <ModalTitle>Are you sure you want to delete this item?</ModalTitle>
            <Button onPress={props.onOk} style={{marginBottom: 15}} label='Delete' />
            <MinorButton onPress={props.onCancel}>Cancel</MinorButton>
        </View>
    );
};
