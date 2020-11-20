import React, { useRef, useState } from 'react';

type UploadProps = {
    image?: string,
    onSetImage: (val: string) => void,
}

export const ImageUpload = (props: UploadProps) => {
    const [upload, setUpload] = useState(props.image !== undefined ? props.image : undefined);
    const input = useRef(null);

    const chooseImage = () => {
        if(input !== null && input !== undefined && input.current !== undefined && input.current !== null) {
            setUpload(URL.createObjectURL(input.current?.files[0]))
        }
    };

    return (
        <span>
            <input type={'file'} ref={input} className={'visually-hidden'} onChange={chooseImage}/>
            <img src={upload} width={40} height={40}/>
        </span>
    );
};
