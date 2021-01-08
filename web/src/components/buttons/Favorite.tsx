import React from "react";

export const FavoriteBtn = (props: { isFav: boolean, toggle: () => void }) => (
    <i className={'favorite-btn material-icons'} onClick={props.toggle}>
        {props.isFav ? 'favorite' : 'favorite_border'}
    </i>
);
