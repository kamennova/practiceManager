import * as React from "react";
import { Modal } from "./Modal";

type ModalProps = {
    closeModal: () => void,
    onSaveNote: (content: string) => void,
};

export const NoteModal = (props: ModalProps) => {
    return (
        <Modal title={'Add note'} close={props.closeModal}>
            todo form
        </Modal>
    );
};
