import React from 'react';
import { Button } from "../Button";
import { Modal } from "../modals/Modal";

export const DeleteModal = (props: { onClose: () => void, onConfirm: () => void }) => {
    const onConfirm = () => {
        props.onConfirm();
        props.onClose();
    };

    return (
        <Modal title={'Are you sure you want to delete this item?'} close={props.onClose}>
            <div className={'modal-btns'}>
                <Button className={'btn-cancel'} onClick={props.onClose}>Cancel</Button>
                <Button className={'btn-delete'} onClick={onConfirm}>Delete</Button>
            </div>
        </Modal>
    );
};
