import React from "react";
import { PlanActivity } from "../../types/PlanActivity";
import { OpacityModal } from "../basic/OpacityModal";
import { ActivityForm } from "./ActivityForm";

type ModalProps = {
    isVisible: boolean,
    hideModal: () => void,
    onSave: (_: PlanActivity) => void,
    activity?: PlanActivity,
};

export const ActivityFormModal = (props: ModalProps) => (
    <OpacityModal isVisible={props.isVisible} hideModal={props.hideModal}>
        <ActivityForm onSave={props.onSave} onClose={props.hideModal} activity={props.activity}/>
    </OpacityModal>
);
