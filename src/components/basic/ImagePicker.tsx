import Constants from 'expo-constants';
import * as ImagePicker from "expo-image-picker";
import { ImagePickerResult } from "expo-image-picker";
import * as Permissions from 'expo-permissions';
import React from 'react';
import { Image, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { AppSidePadding, HeaderIconWrap, TotalHeaderHeight } from "../../AppStyle";
import { TrashIcon } from "./icons/Trash";

type PickerProps = {
    onChoose: (_: ImagePickerResult) => void,
    onDelete: () => void,
    src?: string,
    style?: ViewStyle,
};

const SIZE = 240;

export const MyImagePicker = (props: PickerProps) => {

    const getPermission = async () => {
        if (Constants.platform !== undefined && Constants.platform.ios) {
            await Permissions.askAsync(Permissions.CAMERA_ROLL);
        }
    };

    const pick = async (): Promise<ImagePickerResult> => {
        await getPermission();

        return await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });
    };

    return (
        <TouchableWithoutFeedback onPress={async () => {
            props.onChoose(await pick())
        }}>
            <View style={{
                width: '100%',
                height: SIZE + 1,
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                borderBottomWidth: 1,
                borderColor: 'lightgrey',
                ...props.style,
            }}>
                {props.src !== undefined ? [
                    <Image style={{ width: '100%', height: SIZE }} source={{ uri: props.src }}/>,
                    Layer(),
                    <DeleteIcon onDelete={props.onDelete}/>
                ] : undefined}
                <PickImageButton/>
            </View>
        </TouchableWithoutFeedback>
    );
};

const Layer = () => (
    <View style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
    }}/>
);

const PickImageButton = () => (
    <Image style={{
        width: 30,
        height: 30,
        position: 'absolute',
        bottom: (SIZE - TotalHeaderHeight) / 2
    }}
           source={require('../../../assets/photo.png')}/>
);

const DeleteIcon = (props: { onDelete: () => void }) => (
    <TouchableWithoutFeedback onPress={props.onDelete}>
        <View style={{
            ...HeaderIconWrap,
            position: 'absolute',
            bottom: 10,
            right: AppSidePadding,
        }}>
            <TrashIcon style={{ width: 21, height: 21 }}/>
        </View>
    </TouchableWithoutFeedback>
);
