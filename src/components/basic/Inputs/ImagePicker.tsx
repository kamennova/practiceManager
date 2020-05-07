import Constants from 'expo-constants';
import * as ImagePicker from "expo-image-picker";
import { ImagePickerResult } from "expo-image-picker";
import * as Permissions from 'expo-permissions';
import React from 'react';
import { Image, TouchableWithoutFeedback, View } from "react-native";
import { ImagePickerStyle as getStyles } from "../../AppStyle";
import { useTheme } from "../../theme";
import { TrashIcon } from "./icons/Trash";
import {Ionicons} from '@expo/vector-icons';

type PickerProps = {
    onChoose: (_: ImagePickerResult) => void,
    onDelete: () => void,
    src?: string,
};

export const MyImagePicker = (props: PickerProps) => {
    const colors = useTheme().colors;
    const styles = getStyles(colors);

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
                {props.src !== undefined ? [
                    <Image style={styles.pic} source={{ uri: props.src }}/>,
                    <Layer/>,
                    <DeleteIcon onDelete={props.onDelete}/>
                ] : undefined}
                <PickImageButton color={colors.color}/>
            </View>
        </TouchableWithoutFeedback>
    );
};

const Layer = () => (
    <View style={getStyles(useTheme().colors).layer}/>
);

const PickImageButton = (props: {color: string}) => (<Ionicons size={30} color={props.color} style={getStyles().btnPic} name='md-image'/>);

const DeleteIcon = (props: { onDelete: () => void }) => {
    const styles = getStyles(useTheme().colors);
    return (
    <TouchableWithoutFeedback onPress={props.onDelete}>
        <View style={styles.trashWrap}>
            <TrashIcon style={styles.trash}/>
        </View>
    </TouchableWithoutFeedback>
)};
