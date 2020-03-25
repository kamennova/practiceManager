import React from 'react';
import { Image, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { PenIcon } from "../icons/Pen";
import { TrashIcon } from "../icons/Trash";

type PickerProps = {
    onChoose: () => void,
    onDelete: () => void,
    src?: string,
    style?: ViewStyle,
};

const SIZE = 100;
const PAD = 7;

export const MyImagePicker = (props: PickerProps) => {
    return (
        <TouchableWithoutFeedback onPress={props.onChoose}>
            <View style={{
                width: SIZE + 2,
                height: SIZE + 2,
                backgroundColor: 'lightgrey',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                alignSelf: 'center',
                borderWidth: props.src !== undefined ? 2 : 0,
                borderColor: 'darkgrey',
                ...props.style,
            }}>
                {props.src === undefined ? <PickImageButton/> :
                    <EditImageButton onDelete={props.onDelete} src={props.src}/>}
            </View>
        </TouchableWithoutFeedback>
    );
};

const PickImageButton = () => (
    <Image source={require('../../../assets/photo.png')}/>
);

const EditImageButton = (props: { src: string, onDelete: () => void, }) => (
    <View>
        <Image style={{ width: SIZE, height: SIZE }} source={{ uri: props.src }}/>
        <PenIcon style={{ width: 20, height: 20, position: 'absolute', right: PAD, top: PAD }}/>

        <TouchableWithoutFeedback onPress={props.onDelete}>
            <View style={{
                position: 'absolute',
                width: 30,
                height: 30,
                bottom: 0,
                right: 0,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <TrashIcon style={{ width: 20, height: 20 }}/>
            </View>
        </TouchableWithoutFeedback>
    </View>
);
