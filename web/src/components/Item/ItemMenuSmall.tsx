import React from "react";
import { BackBtn } from "../buttons/Back";
import { FavoriteBtn } from "../buttons/Favorite";

export const ItemMenuSmall = (props: { toggleFav: () => void, goBack: () => void, isFav: boolean }) => {
    return (
        <div className={'item-menu item-menu-small'} style={{width: '100%'}}>
            <BackBtn onClick={props.goBack}/>
            <FavoriteBtn toggle={props.toggleFav} isFav={props.isFav}/>
        </div>
    );
};
