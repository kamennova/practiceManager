import Constants from 'expo-constants';
import * as ImagePicker from "expo-image-picker";
import { ImagePickerResult } from "expo-image-picker";
import * as Permissions from 'expo-permissions';
import React from 'react';
import { Image, TouchableWithoutFeedback, View } from "react-native";
import { ImagePickerStyle as styles } from "../../AppStyle";
import { TrashIcon } from "./icons/Trash";

type PickerProps = {
    onChoose: (_: ImagePickerResult) => void,
    onDelete: () => void,
    src?: string,
};

export const MyImagePicker = (props: PickerProps) => {
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
                <PickImageButton/>
            </View>
        </TouchableWithoutFeedback>
    );
};

const Layer = () => (<View style={styles.layer}/>);

const PickImageButton = () => (<Image style={styles.btnPic} source={require('../../../assets/photo.png')}/>);

const DeleteIcon = (props: { onDelete: () => void }) => (
    <TouchableWithoutFeedback onPress={props.onDelete}>
        <View style={styles.trashWrap}>
            <TrashIcon style={styles.trash}/>
        </View>
    </TouchableWithoutFeedback>
);
