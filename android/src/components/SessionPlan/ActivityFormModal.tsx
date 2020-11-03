import React from "react";
import { SessionActivity } from "../../types/activity";
import { OpacityModal } from "../basic/OpacityModal";
import { ActivityForm } from "./ActivityForm";

type ModalProps = {
    isVisible: boolean,
    hideModal: () => void,
    onSave: (_: SessionActivity) => void,
    activity?: SessionActivity,
};

export const ActivityFormModal = (props: ModalProps) => (
    <OpacityModal isVisible={props.isVisible} hideModal={props.hideModal}>
        <ActivityForm onSave={props.onSave} onClose={props.hideModal} activity={props.activity}/>
    </OpacityModal>
);
