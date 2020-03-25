import React from 'react';
import { View } from "react-native";
import { SmallModalStyle } from "../../AppStyle";
import { Button, MinorButton } from "./Buttons/Button";
import { ModalTitle } from "./Titles/ModalTitle";

export const ConfirmDeleteModal = (props: { onCancel: () => void, onOk: () => void }) => {
    return (
        <View style={SmallModalStyle}>
            <ModalTitle style={{fontSize: 18, lineHeight: 25}}>Are you sure you want to delete this item?</ModalTitle>
            <Button onPress={props.onOk} style={{marginBottom: 15}}>Delete</Button>
            <MinorButton onPress={props.onCancel}>Cancel</MinorButton>
        </View>
    );
};
