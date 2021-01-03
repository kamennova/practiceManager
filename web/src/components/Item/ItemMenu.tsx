import React from 'react';
import { FavoriteBtn } from "../buttons/Favorite";

export const ItemMenu = (props: { onDelete: () => void, onEdit: () => void, toggleFav: () => void, isFav: boolean }) => {
    return (
        <div className={'item-menu'}>
            <FavoriteBtn toggle={props.toggleFav} isFav={props.isFav}/>
            <MenuBtn label={'Edit'} onClick={props.onEdit}/>
            <MenuBtn label={'Delete'} onClick={props.onDelete}/>
        </div>
    );
};

const MenuBtn = (props: { label: string, onClick: () => void }) => (
    <div className={'item-menu-btn'} onClick={props.onClick}>
        {props.label}
    </div>
);
