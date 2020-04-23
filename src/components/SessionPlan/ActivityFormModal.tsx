import React from "react";
import { Modal } from "react-native";
import { PlanActivity } from "../../types/PlanActivity";
import { Layer } from "../basic/Layer";
import { ActivityForm } from "./ActivityForm";

type ModalProps = {
    isVisible: boolean,
    hideModal: () => void,
    onSave: (_: PlanActivity) => void,
    activity?: PlanActivity,
};

export const ActivityFormModal = (props: ModalProps) => (
    <Modal visible={props.isVisible} transparent={true}>
        <Layer isDark={true} onPress={props.hideModal}/>
        <ActivityForm onSave={props.onSave} onClose={props.hideModal} activity={props.activity}/>
    </Modal>
);
