import React from 'react'

interface Props{
    type: string
    placeholder: string
    value: string
    name: string
    onChange: any
}

const Input = ({type, placeholder, value, name, onChange}: Props) => {
    return (
        <div>
            <input
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

export default Input