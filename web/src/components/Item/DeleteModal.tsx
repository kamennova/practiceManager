import React from 'react';
import { Button } from "../Button";

export const DeleteModal = (props: { onClose: () => void, onConfirm: () => void }) => {
    const onConfirm = () => {
        props.onConfirm();
        props.onClose();
    };

    return (
        <div className={'modal'}>
            Are you sure you want to delete this item?
            <div className={'modal-btns'}>
                <Button className={'btn-cancel'} onClick={props.onClose}>Cancel</Button>
                <Button className={'btn-delete'} onClick={onConfirm}>Delete</Button>
            </div>
        </div>
    );
};
