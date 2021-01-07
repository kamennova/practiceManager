import React from "react";

export const Textarea = (props: {value: string, onChange: (s: string) => void, placeholder: string}) => (
    <textarea onChange={(e) => props.onChange(e.target.value)}
              placeholder={props.placeholder}
              className={'px-3 py-3 box-border placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150'                 }>
    {props.value}
  </textarea>
);
