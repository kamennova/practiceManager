import React from 'react';
import './style.module.less';

export const LoaderIcon = (props: {color?: string, size?: number}) => (
    <span className={'loader'}
          style={{width: props.size || 15, height: props.size || 15, borderColor: props.color ? props.color : 'black' }}/>
);
