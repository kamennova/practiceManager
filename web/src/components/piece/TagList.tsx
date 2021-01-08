import React from "react";
import { Tag } from 'common/types/Tag';

export const TagList = (props: { tags: Tag[] }) => (
    <ul className={'tags-list'}>
        {props.tags.map(tag => <li key={tag.name}>
            <i className={'material-icons'} style={{ color: tag.color, fontSize: 11, marginRight: 4 }}>stop_circle</i>
            {tag.name}</li>)}
    </ul>
);
