import React from "react";
import { Modal } from "react-native";
import { Layer } from "../basic/Layer";

type ModalProps = {
    isVisible: boolean,
    hideModal: () => void,
    children: JSX.Element,

};

export const OpacityModal = (props: ModalProps) => (
    <Modal visible={props.isVisible} transparent={true}>
        <Layer isDark={true} onPress={props.hideModal}/>
        {props.children}
    </Modal>
);
