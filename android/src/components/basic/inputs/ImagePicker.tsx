import Constants from 'expo-constants';
import * as ImagePicker from "expo-image-picker";
import { ImagePickerResult } from "expo-image-picker";
import * as Permissions from 'expo-permissions';
import React from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { HeaderIconWrap, ImagePickerStyle as getStyles } from "../../../AppStyle";
import { useTheme } from "../../../theme";
import { ImageIcon } from "../icons/Image";
import { TrashIcon } from "../icons/Trash";

type PickerProps = {
    onChoose: (_: ImagePickerResult) => void,
    onDelete: () => void,
    src?: string,
};

export const MyImagePicker = (props: PickerProps) => {
    const colors = useTheme().colors;
    const styles = getStyles(colors);
    const isPicSet = props.src !== undefined && props.src !== '';

    const getPermission = async () => {
        if (Constants.platform !== undefined && Constants.platform.ios) {
            await Permissions.askAsync(Permissions.CAMERA_ROLL);
        }
    };

    const onPick = async () => {
        await getPermission();

        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        props.onChoose(res);
    };

    return (
        <TouchableWithoutFeedback onPress={async () => await onPick()}>
            <View style={styles.picker}>
                <View style={styles.imageWrap}>
                    {isPicSet ? <Image style={styles.pic} source={{ uri: props.src }}/> : <ImageIcon/>}
                </View>
                <Text style={styles.text}>Cover picture</Text>

                {isPicSet ? <DeleteButton onDelete={props.onDelete}/> : undefined}
            </View>
        </TouchableWithoutFeedback>
    );
};

const DeleteButton = (props: { onDelete: () => void }) => {
    const styles = HeaderIconWrap(useTheme().colors);

    return (
        <TouchableWithoutFeedback onPress={props.onDelete}>
            <View style={styles}>
                <TrashIcon/>
            </View>
        </TouchableWithoutFeedback>
    )
};
