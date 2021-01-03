import React from "react";

export const BackBtn = (props: { onClick: () => void }) => (
    <i onClick={props.onClick} className={'material-icons'}>arrow_back</i>
);
