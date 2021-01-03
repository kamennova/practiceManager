import React from "react";

export const TagList = (props: { tags: string[] }) => (
    <ul className={'tags-list'}>
        {props.tags.map(tag => <li key={tag}>{tag}</li>)}
    </ul>
);
