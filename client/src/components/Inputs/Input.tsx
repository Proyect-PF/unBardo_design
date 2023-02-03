import React from "react";

interface Props{
    id: string
    type: string
    placeholder: string
    value: string
    name: string
    onChange: any
}

const Input = ({id, type, placeholder, value, name, onChange}: Props) => {
    return (
        <div>
            <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="h-12 w-full bg-gray-50 pl-3 rounded-md border border-gray-300"
            name={name}
            />
        </div>
    )
}


export default Input;
